"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "@/i18n/routing";
import { useState } from "react";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { z } from "zod";

// Temporary schema here or import from validations
const submissionSchema = z.object({
  title: z.string().min(3, "Title must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  repoUrl: z.string().url("Must be a valid URL"),
  demoUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
});

type SubmissionInput = z.infer<typeof submissionSchema>;

export default function CreateSubmissionPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SubmissionInput>({
    resolver: zodResolver(submissionSchema) as any,
  });

  async function onSubmit(data: SubmissionInput) {
    setIsLoading(true);
    try {
      console.log("Submitting:", data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast.success("Project submitted successfully!");
      router.push("/submissions");
    } catch {
      toast.error("Failed to submit project");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="flex justify-center p-6">
      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>Submit Project</CardTitle>
          <CardDescription>
            Enter your project details for judging.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Project Title</Label>
              <Input
                id="title"
                placeholder="My Awesome Hack"
                disabled={isLoading}
                {...register("title")}
              />
              {errors.title && (
                <p className="text-sm text-red-500">{errors.title.message}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your project, the problem it solves, and technologies used."
                className="min-h-[150px]"
                disabled={isLoading}
                {...register("description")}
              />
              {errors.description && (
                <p className="text-sm text-red-500">
                  {errors.description.message}
                </p>
              )}
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="repoUrl">Repository URL</Label>
                <Input
                  id="repoUrl"
                  placeholder="https://github.com/username/repo"
                  disabled={isLoading}
                  {...register("repoUrl")}
                />
                {errors.repoUrl && (
                  <p className="text-sm text-red-500">
                    {errors.repoUrl.message}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="demoUrl">Demo URL (Optional)</Label>
                <Input
                  id="demoUrl"
                  placeholder="https://my-app.vercel.app"
                  disabled={isLoading}
                  {...register("demoUrl")}
                />
                {errors.demoUrl && (
                  <p className="text-sm text-red-500">
                    {errors.demoUrl.message}
                  </p>
                )}
              </div>
            </div>

            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="ghost"
                onClick={() => router.back()}
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Submit Project
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
