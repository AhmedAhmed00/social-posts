"use server";
import { uploadImage } from "@/lib/couldinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

function isValidText(title: string): boolean {
  const regex = /^[A-Za-z0-9\s\-\']{2,100}$/;
  return regex.test(title);
}

export interface IErros {
  title: string;
  content: string;
}

export async function createPost(prevState: IErros, formdata: FormData) {
  "use server";
  await new Promise<void>((resolve) => {
    setTimeout(() => {
      resolve();
    }, 1000);
  });

  const title = formdata.get("title");
  const content = formdata.get("content");
  const image = formdata.get("image");
  console.log(title, content);

  let errors = prevState;

  if (!isValidText(String(title))) {
    errors = { ...errors, title: "error in title" };
  }
  if (!isValidText(String(content))) {
    errors = { ...errors, content: "error in content" };
  }
  if (errors.title || errors.content) {
    return errors;
  }

  const imageUrl = await uploadImage(image);

  storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });
  redirect("/feed");
}

export async function triggerLikePost(id: number) {
  "use server";

  await updatePostLikeStatus(id, 2);
  revalidatePath("/posts", "page");
}
