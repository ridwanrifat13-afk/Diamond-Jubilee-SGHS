/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useForm, SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { useState, useEffect, ChangeEvent } from "react";
import { motion } from "motion/react";
import { Diamond, Upload, UserPlus } from "lucide-react";

const addressSchema = z.object({
  thana: z.string().min(1, "Required"),
  upazilla: z.string().min(1, "Required"),
  postOffice: z.string().min(1, "Required"),
  district: z.string().min(1, "Required"),
});

const formSchema = z.object({
  nameEng: z.string().min(2, "Name in English is required"),
  nameBan: z.string().min(2, "Name in Bangla is required"),
  mobile: z.string().min(11, "Valid mobile number required"),
  email: z.string().email().optional().or(z.literal("")),
  presentAddress: addressSchema,
  permanentAddress: addressSchema,
  category: z.enum(["present", "ex"]),
  sscBatch: z.string().optional(),
  group: z.enum(["science", "arts", "commerce"]).optional(),
  photo: z.any().optional(),
  guests: z.any().transform((v) => Number(v) || 0),
});

type FormValues = z.infer<typeof formSchema>;

export default function RegistrationForm() {
  const [userType, setUserType] = useState<"student" | "teacher">("student");
  const [fee, setFee] = useState(0);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      nameEng: "",
      nameBan: "",
      mobile: "",
      email: "",
      presentAddress: { thana: "", upazilla: "", postOffice: "", district: "" },
      permanentAddress: { thana: "", upazilla: "", postOffice: "", district: "" },
      category: "present",
      guests: 0,
    },
  });

  const watchCategory = form.watch("category");
  const watchBatch = form.watch("sscBatch");
  const watchGuests = form.watch("guests");

  useEffect(() => {
    let baseFee = 0;
    if (userType === "student") {
      if (watchCategory === "present") {
        baseFee = 300;
      } else {
        const batchYear = parseInt(watchBatch || "0");
        if (batchYear > 0) {
          if (batchYear >= 2000) {
            baseFee = 1000;
          } else {
            baseFee = 1500;
          }
        }
      }
    } else {
      // Teacher
      if (watchCategory === "present") {
        baseFee = 1500;
      } else {
        baseFee = 1000;
      }
    }
    
    // Calculate total: base fee + 1000 per guest
    const guestCount = Number(watchGuests) || 0;
    setFee(baseFee + (guestCount * 1000));
  }, [userType, watchCategory, watchBatch, watchGuests]);

  const handlePhotoChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
      form.setValue("photo", file);
    }
  };

  const onSubmit: SubmitHandler<FormValues> = (values) => {
    console.log({ ...values, userType, fee });
    alert("Registration submitted successfully! (Demo)");
  };

  return (
    <div className="relative min-h-screen py-20 md:py-32 px-4 flex items-center justify-center overflow-hidden bg-[#F8FAFB]">
      {/* Colorful Background Blobs */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#1D4D5F]/5 rounded-full blur-[100px] -translate-y-1/2 -translate-x-1/2"></div>
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#609194]/5 rounded-full blur-[100px] translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/3 rounded-full blur-[120px]"></div>

      {/* Background Icon - Full Page Cover */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 pointer-events-none overflow-hidden">
        <div className="relative w-full h-full flex items-center justify-center">
          <img 
            src="/Diamond Jubilee.webp" 
            alt="Diamond Jubilee Logo" 
            className="w-full h-full object-contain scale-125"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement?.querySelector('.fallback-icon')?.classList.remove('hidden');
            }}
            referrerPolicy="no-referrer"
          />
          <div className="fallback-icon hidden text-blue-600/10">
            <Diamond size={800} />
          </div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-3xl z-10 px-2 sm:px-0"
      >
        <Card className="shadow-[0_8px_32px_0_rgba(5,22,30,0.2)] border border-white/10 !bg-transparent backdrop-blur-3xl ring-1 ring-white/5 rounded-lg md:rounded-[2rem] overflow-hidden">
          <CardHeader className="text-center border-b border-white/10 pb-3 md:pb-8 pt-4 md:pt-10 !bg-transparent">
            <CardTitle className="text-lg md:text-4xl font-black text-[#05161E] tracking-tight">Program Registration</CardTitle>
            <p className="text-[#1D4D5F] mt-0.5 font-semibold tracking-wide uppercase text-[7px] md:text-xs">Join us in celebrating 60 years of excellence</p>
          </CardHeader>
          <CardContent className="p-3 md:p-12">
            <Tabs defaultValue="student" onValueChange={(v) => setUserType(v as any)} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-3 md:mb-10 h-8 md:h-14 bg-[#05161E]/5 p-0.5 md:p-1.5 rounded-md md:rounded-2xl">
                <TabsTrigger value="student" className="text-xs md:text-lg font-bold rounded-sm md:rounded-xl data-[state=active]:bg-white/20 data-[state=active]:shadow-sm text-[#05161E]">Student</TabsTrigger>
                <TabsTrigger value="teacher" className="text-xs md:text-lg font-bold rounded-sm md:rounded-xl data-[state=active]:bg-white/20 data-[state=active]:shadow-sm text-[#05161E]">Teacher</TabsTrigger>
              </TabsList>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3 md:space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-8">
                  <div className="md:col-span-2 space-y-3 md:space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                      <div className="space-y-1">
                        <Label htmlFor="nameEng" className="text-[#05161E] font-bold text-[9px] md:text-sm uppercase tracking-wider">Name (English)</Label>
                        <Input id="nameEng" placeholder="Full Name" className="h-8 md:h-12 bg-white/10 border-[#05161E]/20 focus:border-[#1D4D5F] focus:bg-white/20 transition-all rounded-md md:rounded-xl placeholder:text-gray-400 text-[#05161E] text-xs" {...form.register("nameEng")} />
                        {form.formState.errors.nameEng && <p className="text-[7px] md:text-xs font-bold text-red-500 mt-1">{form.formState.errors.nameEng.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="nameBan" className="text-[#05161E] font-bold text-[9px] md:text-sm uppercase tracking-wider">নাম (বাংলা)</Label>
                        <Input id="nameBan" placeholder="পুরো নাম" className="h-8 md:h-12 bg-white/10 border-[#05161E]/20 focus:border-[#1D4D5F] focus:bg-white/20 transition-all rounded-md md:rounded-xl placeholder:text-gray-400 text-[#05161E] text-xs" {...form.register("nameBan")} />
                        {form.formState.errors.nameBan && <p className="text-[7px] md:text-xs font-bold text-red-500 mt-1">{form.formState.errors.nameBan.message}</p>}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-8">
                      <div className="space-y-1">
                        <Label htmlFor="mobile" className="text-[#05161E] font-bold text-[9px] md:text-sm uppercase tracking-wider">Mobile Number</Label>
                        <Input id="mobile" placeholder="017XXXXXXXX" className="h-8 md:h-12 bg-white/10 border-[#05161E]/20 focus:border-[#1D4D5F] focus:bg-white/20 transition-all rounded-md md:rounded-xl placeholder:text-gray-400 text-[#05161E] text-xs" {...form.register("mobile")} />
                        {form.formState.errors.mobile && <p className="text-[7px] md:text-xs font-bold text-red-500 mt-1">{form.formState.errors.mobile.message}</p>}
                      </div>
                      <div className="space-y-1">
                        <Label htmlFor="email" className="text-[#05161E] font-bold text-[9px] md:text-sm uppercase tracking-wider">Email (Optional)</Label>
                        <Input id="email" placeholder="john@example.com" className="h-8 md:h-12 bg-white/10 border-[#05161E]/20 focus:border-[#1D4D5F] focus:bg-white/20 transition-all rounded-md md:rounded-xl placeholder:text-gray-400 text-[#05161E] text-xs" {...form.register("email")} />
                      </div>
                    </div>
                  </div>

                  {/* Photo Upload Area */}
                  <div className="space-y-2">
                    <Label className="text-[#05161E] font-bold text-[9px] md:text-sm uppercase tracking-wider">Profile Photo</Label>
                    <div className="relative group/photo">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePhotoChange}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="flex flex-col items-center justify-center w-full h-32 md:h-full min-h-[140px] border-2 border-dashed border-[#1D4D5F]/20 rounded-2xl bg-white/5 hover:bg-white/10 hover:border-[#1D4D5F]/40 cursor-pointer transition-all overflow-hidden"
                      >
                        {photoPreview ? (
                          <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
                        ) : (
                          <>
                            <Upload className="w-8 h-8 text-[#1D4D5F] mb-2 opacity-50" />
                            <span className="text-[10px] md:text-[11px] font-bold text-[#1D4D5F]/60 uppercase tracking-widest text-center px-2">Click to Upload Photo</span>
                          </>
                        )}
                      </label>
                      {photoPreview && (
                        <button
                          type="button"
                          onClick={() => setPhotoPreview(null)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center text-xs shadow-lg opacity-0 group-hover/photo:opacity-100 transition-opacity"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Addresses */}
                <div className="space-y-3 md:space-y-6 pt-1 md:pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 md:h-8 w-1 bg-[#1D4D5F] rounded-full"></div>
                    <h3 className="font-black text-base md:text-xl text-[#05161E] tracking-tight">Present Address</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {["thana", "upazilla", "postOffice", "district"].map((key) => (
                      <div key={key} className="space-y-1">
                        <Label className="capitalize text-[#1D4D5F] text-[8px] md:text-[10px] font-black uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <Input className="h-8 md:h-11 bg-white/10 border-[#05161E]/20 rounded-md focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs" {...form.register(`presentAddress.${key}` as any)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-3 md:space-y-6 pt-1 md:pt-4">
                  <div className="flex items-center gap-2">
                    <div className="h-4 md:h-8 w-1 bg-[#609194] rounded-full"></div>
                    <h3 className="font-black text-base md:text-xl text-[#05161E] tracking-tight">Permanent Address</h3>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-4">
                    {["thana", "upazilla", "postOffice", "district"].map((key) => (
                      <div key={key} className="space-y-1">
                        <Label className="capitalize text-[#1D4D5F] text-[8px] md:text-[10px] font-black uppercase tracking-widest">{key.replace(/([A-Z])/g, ' $1')}</Label>
                        <Input className="h-8 md:h-11 bg-white/10 border-[#05161E]/20 rounded-md focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs" {...form.register(`permanentAddress.${key}` as any)} />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 pt-4 md:pt-8 border-t border-white/10">
                  <div className="space-y-1">
                    <Label className="text-[#05161E] font-bold text-[10px] md:text-sm uppercase tracking-wider">Category</Label>
                    <Select onValueChange={(v) => form.setValue("category", v as any)} defaultValue={form.getValues("category")}>
                      <SelectTrigger className="h-9 md:h-12 bg-white/10 border-[#05161E]/20 rounded-lg focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent className="bg-white/80 backdrop-blur-3xl border-white/10">
                        <SelectItem value="present">Present</SelectItem>
                        <SelectItem value="ex">Ex</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-1">
                    <Label htmlFor="guests" className="text-[#05161E] font-bold text-[10px] md:text-sm uppercase tracking-wider flex items-center gap-2">
                       Guests <span className="text-[8px] opacity-60 normal-case">(+1000 TK each)</span>
                    </Label>
                    <div className="relative">
                      <UserPlus className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#1D4D5F] opacity-50" />
                      <Input 
                        id="guests" 
                        type="number"
                        min="0"
                        placeholder="0" 
                        className="pl-10 h-9 md:h-12 bg-white/10 border-[#05161E]/20 rounded-lg focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs" 
                        {...form.register("guests")} 
                      />
                    </div>
                  </div>

                  {userType === "student" ? (
                    <div className="grid grid-cols-2 gap-2 md:gap-4">
                      <div className="space-y-1">
                        <Label htmlFor="sscBatch" className="text-[#05161E] font-bold text-[10px] md:text-sm uppercase tracking-wider">SSC Batch</Label>
                        <Input id="sscBatch" placeholder="2015" className="h-9 md:h-12 bg-white/10 border-[#05161E]/20 rounded-lg focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs" {...form.register("sscBatch")} />
                      </div>
                      <div className="space-y-1">
                        <Label className="text-[#05161E] font-bold text-[10px] md:text-sm uppercase tracking-wider">Group</Label>
                        <Select onValueChange={(v) => form.setValue("group", v as any)} defaultValue={form.getValues("group")}>
                          <SelectTrigger className="h-9 md:h-12 bg-white/10 border-[#05161E]/20 rounded-lg focus:border-[#1D4D5F] focus:bg-white/20 text-[#05161E] text-xs">
                            <SelectValue placeholder="Group" />
                          </SelectTrigger>
                          <SelectContent className="bg-white/80 backdrop-blur-3xl border-white/10">
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="arts">Arts</SelectItem>
                            <SelectItem value="commerce">Commerce</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-end">
                      <p className="text-[10px] font-bold text-[#1D4D5F]/60 italic pb-3 tracking-tight">Teacher Registration Mode Active</p>
                    </div>
                  )}
                </div>

                <div className="flex flex-col items-center justify-center p-3 md:p-8 bg-[#1D4D5F]/5 backdrop-blur-3xl rounded-lg md:rounded-[2rem] border border-white/10 shadow-inner space-y-2 md:space-y-6">
                  <div className="text-center">
                    <span className="text-[7px] md:text-xs font-black text-[#1D4D5F] uppercase tracking-[0.2em]">Registration Fee</span>
                    <div className="text-2xl md:text-5xl font-black text-[#05161E] mt-0.5 md:mt-2 flex items-baseline gap-1 md:gap-2">
                      {fee} <span className="text-sm md:text-2xl font-bold opacity-60">TK</span>
                    </div>
                  </div>
                  <Button type="button" variant="outline" className="w-full md:w-auto px-6 md:px-16 h-9 md:h-14 text-xs md:text-lg font-black border-white/10 bg-white/5 hover:bg-white/10 transition-all rounded-md md:rounded-2xl shadow-sm text-[#05161E]">
                    Pay Now
                  </Button>
                </div>

                <Button type="submit" className="w-full h-10 md:h-16 text-sm md:text-xl font-black bg-[#1D4D5F] hover:bg-[#05161E] text-white shadow-[0_10px_30px_-10px_rgba(29,77,95,0.5)] rounded-md md:rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]">
                  Submit Registration
                </Button>
              </form>
            </Tabs>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
