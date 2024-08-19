"use client";

import CoverPicker from "@/app/_components/CoverPicker";
import EmojiPickerComponent from "@/app/_components/EmojiPickerComponent";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { db } from "@/config/firebaseConfig";
import { useAuth, useUser } from "@clerk/nextjs";
import { doc, setDoc } from "firebase/firestore";
import { Loader2Icon, SmilePlus } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import uuid4 from "uuid4";

function CreateWorkspace() {
  const [coverImage, setCoverImage] = useState("/cover.png");
  const [workspaceName, setWorkspaceName] = useState("");
  const [emoji, setEmoji] = useState("");
  const { user } = useUser();
  const { orgId } = useAuth();
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onCreateWorkspace = async () => {
    setLoading(true);
    const workspaceId = Date.now().toString();
    await setDoc(doc(db, "Workspace", workspaceId), {
      workspaceName: workspaceName,
      emoji: emoji,
      coverImage: coverImage,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      id: workspaceId,
      orgId: orgId || user?.primaryEmailAddress?.emailAddress,
    });
    const docId = uuid4();
    await setDoc(doc(db, "workspaceDocuments", docId.toString()), {
      workspaceId: workspaceId,
      createdBy: user?.primaryEmailAddress?.emailAddress,
      coverImage:null,
      emoji:null,
      id: docId,
      documentOutput:[],
    });
    await setDoc(doc(db,'documentOutput',docId.toString()),{
      documentId:docId,
      documentOutput:[]
    });
    setLoading(false);
    router.replace("/workspace/" + workspaceId+"/"+docId);
  };

  return (
    <div className="p-10 md:px-36 lg:px-64 xl:px-96 py-28">
      <div className="shadow-2xl rounded-xl">
        <CoverPicker setNewCover={(v) => setCoverImage(v)}>
          <div className="relative group cursor-pointer">
            <h2 className="hidden absolute p-4 w-full h-full items-center justify-center group-hover:flex">
              Change Cover
            </h2>
            <div className="group-hover:opacity-40">
              <Image
                src={coverImage}
                alt="Cover Image"
                height={400}
                width={400}
                className="w-full h-[180px] object-cover rounded-t-xl"
              />
            </div>
          </div>
        </CoverPicker>
        <div className="p-12">
          <h2 className="font-medium text-xl">Create a new workspace</h2>
          <h2 className="mt-2 text-sm">Create a new workspace</h2>
          <div className="mt-8 flex gap-2 items-center">
            <EmojiPickerComponent setEmojiIcon={(v) => setEmoji(v)}>
              <Button variant="outline">{emoji || <SmilePlus />}</Button>
            </EmojiPickerComponent>
            <Input
              placeholder="Workspace Name"
              onChange={(e) => setWorkspaceName(e.target.value)}
            />
          </div>
          <div className="flex gap-6 justify-end mt-10">
            <Button
              disabled={!workspaceName.length || loading}
              onClick={onCreateWorkspace}
            >
              Create {loading && <Loader2Icon className="animate-spin ml-2" />}
            </Button>
            <Button variant="destructive">Cancel</Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateWorkspace;
