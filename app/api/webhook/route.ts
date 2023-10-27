import type { IncomingHttpHeaders } from "http";
import type { WebhookRequiredHeaders } from "svix";
import type { WebhookEvent } from "@clerk/nextjs/server";
import { Webhook } from "svix";
import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { db } from "@/server/db";
import { z } from "zod";

const UserUpdateSchema = z.object({
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  email: z.string().email().optional(),
  image: z.string().url().optional(),
});

const webhookSecret: string =
  process.env.WEBHOOK_SECRET ?? "incorrect WEBHOOK_SECRET";

export async function POST(req: Request) {
  const body = (await req.json()) as string;
  const payload = JSON.stringify(body);
  const header = headers();
  const heads = {
    "svix-id": header.get("svix-id"),
    "svix-timestamp": header.get("svix-timestamp"),
    "svix-signature": header.get("svix-signature"),
  };
  console.log("Webhook triggered");

  // Create a new Webhook instance with your webhook secret
  const wh = new Webhook(webhookSecret);
  let evt: WebhookEvent;

  try {
    // Verify the webhook payload and headers
    evt = wh.verify(
      payload,
      heads as IncomingHttpHeaders & WebhookRequiredHeaders,
    ) as WebhookEvent;
    console.log("Event type : ", evt.type);
    console.log("Event Id : ", evt.data.id);

    // const { id: userId } = evt.data;
    const eventType = evt.type;

    switch (eventType) {
      case "user.created": {
        const {
          id,
          last_name,
          first_name,
          email_addresses,
          image_url,
          primary_email_address_id,
        } = evt.data;
        const email = email_addresses.find(
          (eml) => eml.id === primary_email_address_id,
        )?.email_address;

        // console.log(`User created ${id} : `, {
        //   id,
        //   first_name,
        //   last_name,
        //   image_url,
        //   email: email,
        // });

        // Create User in DB
        await db.user.create({
          data: {
            id,
            firstName: first_name,
            lastName: last_name,
            email: email!,
            image: image_url,
          },
        });

        return NextResponse.json(
          { message: "All is well, user created" },
          { status: 201 },
        );
      }

      case "user.updated": {
        const {
          id,
          last_name,
          first_name,
          email_addresses,
          image_url,
          primary_email_address_id,
        } = evt.data;
        const email = email_addresses.find(
          (eml) => eml.id === primary_email_address_id,
        )?.email_address;

        // console.log(`User updated ${id} : ${first_name} `);

        // Create an object to hold the data you want to update
        const userDataToUpdate = {} as z.infer<typeof UserUpdateSchema>;

        if (first_name) {
          userDataToUpdate.firstName = first_name;
        }

        if (last_name) {
          userDataToUpdate.lastName = last_name;
        }

        if (email) {
          userDataToUpdate.email = email;
        }

        if (image_url) {
          userDataToUpdate.image = image_url;
        }

        // Update User in DB
        if (Object.keys(userDataToUpdate).length > 0) {
          // Validate the userDataToUpdate object against the Zod schema
          UserUpdateSchema.parse(userDataToUpdate);
          await db.user.update({
            where: {
              id,
            },
            data: userDataToUpdate,
            include: {
              Form: true,
            },
          });
        }

        return NextResponse.json(
          { message: "All is well, user updated" },
          { status: 200 },
        );
      }

      case "user.deleted": {
        const { id } = evt.data;

        // console.log(`User deleted ${id} :`, evt.data);

        // Update User in DB
        await db.user.delete({
          where: {
            id,
          },
        });

        return NextResponse.json(
          { message: "All is well,  user deleted" },
          { status: 200 },
        );
      }

      default: {
        // console.log(`User ${id}, unknown action: ${eventType}`);

        return NextResponse.json(
          { message: "All is well, unknown action" },
          { status: 204 },
        );
      }
    }
  } catch (_e) {
    const error = _e as Error;
    console.log("Encountered Error for the webhook action", error.message);
    // If the verification fails, return a 400 error
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 400 },
    );
  }
}
