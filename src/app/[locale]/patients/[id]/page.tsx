"use client";

import { Patient, SignUpValidationSchema } from "@/app/models/patient";
import LayoutHome from "../layout";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { listPatientById, updatePatientById } from "@/services/patient";
import { toast } from "react-toastify";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import Loading from "../loading";
import ReactDatePicker from "react-datepicker";
import { useTranslations } from "next-intl";

export default function Page({ params }: { params: { id: string } }) {
  const t = useTranslations("Index");

  const updatePatientSchema = z.object({
    name: z.string().min(3, t("patients.createPatient.errors.name")),
    lastName: z.string().min(3, t("patients.createPatient.errors.lastName")),
    birth: z
      .string({
        required_error: t("patients.createPatient.errors.birth"),
      })
      .refine(
        (data) => {
          const birth = new Date(data);
          const currentDate = new Date();
          return birth <= currentDate;
        },
        {
          message: t("patients.createPatient.errors.birthInvalid"),
        }
      ),
    address: z.string().min(3, t("patients.createPatient.errors.address")),
    email: z.string().email(t("patients.createPatient.errors.email")),
  });

  const queryClient = useQueryClient();
  const { data: patient, isLoading } = useQuery({
    queryFn: () => listPatientById(params.id),
    queryKey: ["listPatientById", params.id],
    refetchOnWindowFocus: false,
  });

  const {
    control,
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<SignUpValidationSchema>({
    resolver: zodResolver(updatePatientSchema),
  });

  const { mutate, isLoading: isUpdating } = useMutation({
    mutationFn: (values: Patient) => updatePatientById(values, params.id),
    onSuccess: () => {
      queryClient.invalidateQueries(["listPatientById"]);
      queryClient.invalidateQueries(["listPatients"]);
      toast.success(t("patients.updatePatient.toast.success"));
    },
    onError: () => {
      toast.error(t("patients.updatePatient.toast.error"));
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleUpdatePatient: SubmitHandler<Patient> = async (data) => {
    mutate({ ...data });
  };

  return (
    <LayoutHome>
      <header className="flex items-center mt-4">
        <h1 className="text-white text-3xl">
          {t("patients.updatePatient.title")} {patient?.name}
        </h1>
      </header>
      <form
        onSubmit={handleSubmit(handleUpdatePatient)}
        className="mt-8 max-w-lg w-full"
      >
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder={t("patients.createPatient.name")}
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="name"
            title={t("patients.createPatient.name")}
            defaultValue={patient?.name}
            {...register("name")}
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder={t("patients.createPatient.lastName")}
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="lastName"
            title={t("patients.createPatient.lastName")}
            defaultValue={patient?.lastName}
            {...register("lastName")}
          />
          {errors.lastName && (
            <span className="text-red-500 text-sm">
              {errors.lastName.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full mb-5">
          <input
            placeholder={t("patients.createPatient.email")}
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="email"
            id="email"
            title={t("patients.createPatient.email")}
            defaultValue={patient?.email}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-red-500 text-sm">{errors.email.message}</span>
          )}
        </div>

        <div className="flex flex-col w-full mb-5">
          <input
            placeholder={t("patients.createPatient.address")}
            className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
            type="text"
            id="address"
            title={t("patients.createPatient.address")}
            defaultValue={patient?.address}
            {...register("address")}
          />
          {errors.address && (
            <span className="text-red-500 text-sm">
              {errors.address.message}
            </span>
          )}
        </div>
        <div className="flex flex-col w-full">
          <Controller
            control={control}
            name="birth"
            defaultValue={patient?.birth}
            render={({ field }) => (
              <ReactDatePicker
                className="text-white  bg-main-bg w-full rounded-md outline-border-light p-2 border border-border-light"
                placeholderText={t("patients.createPatient.birth")}
                onChange={(date) => field.onChange(date?.toISOString())}
                selected={field.value ? new Date(field.value) : null}
                dateFormat="dd/MM/yyyy"
                id="birth"
              />
            )}
          />
          {errors.birth && (
            <span className="text-red-500 text-sm">{errors.birth.message}</span>
          )}
        </div>
        <div className="flex items-center gap-5">
          <Button
            className="max-w-[15rem] w-full mt-5 flex items-center justify-center"
            color="primary"
            type="button"
          >
            <Link className="w-full" href="/patients">
              {t("patients.actions.back")}
            </Link>
          </Button>
          <Button
            className="max-w-[15rem] w-full mt-5"
            disabled={isUpdating}
            type="submit"
            color="primary"
          >
            {isUpdating
              ? t("patients.updatePatient.updating")
              : t("patients.updatePatient.update")}
          </Button>
        </div>
      </form>
    </LayoutHome>
  );
}
