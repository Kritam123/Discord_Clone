import { createUploadthing, type FileRouter } from "uploadthing/next";
const f = createUploadthing();
import { currentUser } from "@clerk/nextjs";
export const ourFileRouter = {
  serverImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) throw new Error("Unauthorized");

      return { userId: user?.id };
    })
    .onUploadComplete(async () => {}),
  profileImage: f({ image: { maxFileSize: "4MB" } })
    .middleware(async () => {
      const user = await currentUser();

      if (!user) throw new Error("Unauthorized");

      return { userId: user?.id };
    })
    .onUploadComplete(async () => {}),
  messageFile: f(["image","pdf","application/pdf","application/docbook+xml","application/vnd.ms-powerpoint","application/msword"])
    .middleware(async () => {
      const user = await currentUser();

      if (!user) throw new Error("Unauthorized");

      return { userId: user?.id };
    })
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
