import { useEffect, useState } from "react";
import { TextField } from "@mui/material";
import { Container, styleTopBarUINoFlex, INPUT_CLASSES } from "../constanta/style";
import { BUTTON } from "../ui";
import schoolSettingsService from "../service/school-settings";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";
import { validate, fieldProps, required, text as vText } from "../../../shared/validation";

// Maktab sozlamalari — admin maktab nomi, o'quv yili, aloqa ma'lumotlarini boshqaradi.
function SchoolSettings() {
  const { t } = useTranslation();
  const [form, setForm] = useState({
    schoolName: "", shortName: "", academicYear: "",
    address: "", phone: "", email: "", website: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    (async () => {
      const data = await schoolSettingsService.get();
      if (data) {
        setForm({
          schoolName: data.schoolName || "",
          shortName: data.shortName || "",
          academicYear: data.academicYear || "",
          address: data.address || "",
          phone: data.phone || "",
          email: data.email || "",
          website: data.website || "",
        });
      }
      setLoading(false);
    })();
  }, []);

  const set = (key) => (e) => {
    setForm((f) => ({ ...f, [key]: e.target.value }));
    if (errors[key]) setErrors((er) => ({ ...er, [key]: "" }));
  };

  const save = async () => {
    const errs = validate({
      schoolName: { value: form.schoolName, validators: [required] },
      academicYear: { value: form.academicYear, validators: [required] },
      phone: { value: form.phone, validators: [vText(30)] },
    });
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      toast.error(t("v_form_invalid"));
      return;
    }
    setSaving(true);
    try {
      await schoolSettingsService.update(form);
      toast.success(t("school_saved"));
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 p-3 flex items-center`}>
        <h3 className="text-lg font-bold text-textBlack">{t("school_settings")}</h3>
      </div>

      <div className={`${styleTopBarUINoFlex} min-h-96 p-4`}>
        {loading ? (
          <div className="flex items-center justify-center py-16 text-textGray">...</div>
        ) : (
          <div className="flex flex-col gap-4 max-w-[760px]">
            <div className="grid grid-cols-1 tablet:grid-cols-2 gap-4">
              <TextField value={form.schoolName} onChange={set("schoolName")} label={t("school_name")} placeholder={t("enter")} {...fieldProps(errors, t, "schoolName")} sx={INPUT_CLASSES} />
              <TextField value={form.shortName} onChange={set("shortName")} label={t("school_short_name")} placeholder="NSS" sx={INPUT_CLASSES} />
              <TextField value={form.academicYear} onChange={set("academicYear")} label={t("school_year")} placeholder="2025-2026" {...fieldProps(errors, t, "academicYear")} sx={INPUT_CLASSES} />
              <TextField value={form.phone} onChange={set("phone")} label={t("phone_number")} placeholder="+998..." {...fieldProps(errors, t, "phone")} sx={INPUT_CLASSES} />
              <TextField value={form.email} onChange={set("email")} label={t("school_email")} placeholder="info@..." sx={INPUT_CLASSES} />
              <TextField value={form.website} onChange={set("website")} label={t("school_website")} placeholder="newstarschool.uz" sx={INPUT_CLASSES} />
              <TextField value={form.address} onChange={set("address")} label={t("home_address")} placeholder={t("enter")} sx={INPUT_CLASSES} className="tablet:col-span-2" />
            </div>
            <div className="mt-2">
              <BUTTON name={saving ? "..." : t("save")} active buttonFunction={save} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default SchoolSettings;
