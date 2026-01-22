"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Plus, Calendar, MapPin } from "lucide-react";
import { useUserStore } from "@/store";
import { useTranslation } from "react-i18next";

export default function EventsPage() {
  const user = useUserStore((state) => state.user);
  const isAdmin = user?.role === "ORGANIZER";
  const { t } = useTranslation();

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-gray-900 tracking-tight underline decoration-indigo-600/20 decoration-4 underline-offset-8">
          {t("dashboard.events.title")}
        </h1>
        {isAdmin && (
          <Link href="/admin/events/create">
            <Button className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full px-6 font-black uppercase tracking-widest text-[10px] h-10 shadow-lg shadow-indigo-100">
              <Plus className="mr-2 h-3.5 w-3.5" />
              {t("dashboard.events.create")}
            </Button>
          </Link>
        )}
      </div>
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {/* Placeholder Event Card */}
        <Card className="rounded-[2rem] border-gray-100 shadow-sm hover:shadow-xl hover:shadow-indigo-50/50 transition-all duration-300 overflow-hidden group">
          <CardHeader className="p-8 pb-4">
            <CardTitle className="text-xl font-bold group-hover:text-indigo-600 transition-colors">
              Global AI Hackathon 2026
            </CardTitle>
            <CardDescription className="font-medium text-gray-500">
              Build the next generation of AI applications.
            </CardDescription>
          </CardHeader>
          <CardContent className="px-8 space-y-3">
            <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
              <Calendar className="mr-2 h-4 w-4 text-indigo-400" />
              Feb 14 - Feb 16, 2026
            </div>
            <div className="flex items-center text-sm font-bold text-gray-400 uppercase tracking-widest">
              <MapPin className="mr-2 h-4 w-4 text-indigo-400" />
              {t("dashboard.events.online")}
            </div>
          </CardContent>
          <CardFooter className="p-8 pt-6">
            <Link href="/events/global-ai-hackathon-2026" className="w-full">
              <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl h-12 font-black uppercase tracking-widest text-[10px] shadow-lg shadow-indigo-100">
                {t("dashboard.events.viewDetails")}
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
