"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import Left from "@/components/icons/Left";
import MenuItemForm from "@/app/(admin)/_components/MenuItemForm";
import UserTabs from "@/components/UserTabs";


const NewMenuItemPage = () => {
  const router = useRouter();

  const handleFormSubmit = async (e, newMenuItem) => {
    e.preventDefault();

    const savingPromise = fetch("/api/menu-items", {
      method: "POST",
      body: JSON.stringify(newMenuItem),
    }).then(res => {
      if (!res.ok) throw new Error('Something went wrong!');
      router.push("/menu-items");
    });

    await toast.promise(savingPromise, {
      loading: "Saving this tasty item",
      success: "Saved!",
      error: "Error",
    });
  }

  return (
    <section className="mt-8">
      <UserTabs isAdmin={true} />
      <div className="max-w-2xl mx-auto mt-8">
        <Link href={"/menu-items"} className="button">
          <Left />
          <span>Show all menu items</span>
        </Link>
      </div>
      <MenuItemForm menuItem={null} onSubmit={handleFormSubmit} />
    </section>
  );
}

export default NewMenuItemPage;