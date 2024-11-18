"use client";

import {
  Form,
  FormField,
  FormItem,
  FormMessage,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { updateUser } from "@/actions/updateUser";
import { User } from "@prisma/client";
import { useEffect, useState } from "react";
import { getUserById } from "@/actions/getUserById";

const formSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters long"),
  email: z.string().email("Must be a valid email"),
});

type FormData = z.infer<typeof formSchema>;

export default function UpdateUserForm({ id }: { id: number }) {
  const [user, setUser] = useState<User | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
    },
  });

  useEffect(() => {
    const getUser = async () => {
      const parsedId = id.toString();
      const user = await getUserById({ id: parsedId });
      if (user) {
        form.reset({
          name: user.name,
          email: user.email,
        });
      }
      setUser(user);
    };
    getUser();
  }, [id, form]);

  const { toast } = useToast();

  async function onSubmit(data: FormData) {
    try {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("email", data.email);
      formData.append("id", id.toString());
      const newUser = await updateUser(formData);
      toast({
        title: "User created",
        description: `User ${newUser.name} was created successfully`,
      });
      form.reset();
    } catch (error) {
      console.error("Error while creating user:", error);
      const errorMessage =
        error instanceof Error ? error.message : "Error while creating user";
      toast({
        title: "Error",
        description: errorMessage,
      });
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4 max-w-3xl mx-auto py-5"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" type="text" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="E-Mail" type="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}
