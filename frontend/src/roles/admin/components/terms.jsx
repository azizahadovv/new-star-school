import { useEffect, useState } from "react";
import Rodal from "rodal";
import { TextField } from "@mui/material";
import { Container, styleTopBarUINoFlex, INPUT_CLASSES } from "../constanta/style";
import { BUTTON } from "../ui";
import { trash, editBlue } from "../icons";
import termService from "../service/term";
import { toast } from "react-toastify";
import { useTranslation } from "react-i18next";

// Akademik choraklar (terms) — admin to'liq boshqaradi: yaratish, tahrirlash, o'chirish.
function Terms() {
  const { t } = useTranslation();
  const [terms, setTerms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [visible, setVisible] = useState(false);
  const [editId, setEditId] = useState(null);
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [term, setTerm] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    loadTerms();
  }, []);

  const loadTerms = async () => {
    setLoading(true);
    const data = await termService.getAllTerms();
    setTerms(Array.isArray(data) ? data : []);
    setLoading(false);
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setYear("");
    setTerm("");
    setErrors({});
  };

  const openCreate = () => {
    resetForm();
    setVisible(true);
  };

  const openEdit = (item) => {
    setEditId(item.id);
    setName(item.name || "");
    setYear(item.year ?? "");
    setTerm(item.term ?? "");
    setErrors({});
    setVisible(true);
  };

  const closeModal = () => {
    setVisible(false);
    resetForm();
  };

  const buildErrors = () => {
    const e = {};
    if (!String(name).trim()) e.name = t("v_required");
    const y = Number(year);
    if (!String(year).trim()) e.year = t("v_required");
    else if (!Number.isInteger(y) || y < 2000 || y > 2100) e.year = t("v_year");
    const tm = Number(term);
    if (!String(term).trim()) e.term = t("v_required");
    else if (!Number.isInteger(tm) || tm < 1 || tm > 4) e.term = t("v_term");
    return e;
  };

  const save = async () => {
    const e = buildErrors();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      toast.error(t("v_form_invalid"));
      return;
    }
    const body = { name: name.trim(), year: Number(year), term: Number(term) };
    try {
      if (editId == null) {
        await termService.createTerm(body);
        toast.success(t("term_created"));
      } else {
        await termService.updateTerm(editId, body);
        toast.success(t("term_updated"));
      }
      closeModal();
      loadTerms();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  const remove = async (id) => {
    if (!window.confirm(t("term_delete_confirm"))) return;
    try {
      await termService.deleteTerm(id);
      toast.success(t("term_deleted"));
      loadTerms();
    } catch (error) {
      toast.error(error?.response?.data?.message || error.message);
    }
  };

  return (
    <div className={`${Container}`}>
      <div className={`${styleTopBarUINoFlex} min-h-20 p-3 flex items-center justify-between`}>
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-bold text-textBlack">{t("terms_management")}</h3>
          <span className="px-2 py-0.5 text-xs rounded-full bg-lightGray text-textGray">{terms.length}</span>
        </div>
        <BUTTON name={t("add_term")} active buttonFunction={openCreate} />
      </div>

      <div className={`${styleTopBarUINoFlex} min-h-96 overflow-auto p-3`}>
        {loading ? (
          <div className="flex items-center justify-center mt-10 text-textGray">...</div>
        ) : terms.length === 0 ? (
          <div className="flex items-center justify-center mt-10">
            <h3 className="text-textGray">{t("no_date")}</h3>
          </div>
        ) : (
          <table className="table table-hover">
            <thead>
              <tr>
                <th><p className="min-w-16">№</p></th>
                <th><p className="min-w-40">{t("term_name")}</p></th>
                <th><p className="min-w-28">{t("term_year")}</p></th>
                <th><p className="min-w-28">{t("term_number")}</p></th>
                <th><p className="min-w-28">{t("active_table")}</p></th>
              </tr>
            </thead>
            <tbody>
              {terms.map((item, idx) => (
                <tr key={item.id}>
                  <td>{idx + 1}</td>
                  <td className="font-medium">{item.name}</td>
                  <td>{item.year}</td>
                  <td>{item.term}</td>
                  <td>
                    <div className="flex items-center gap-3">
                      <button title={t("editing")} onClick={() => openEdit(item)}>
                        <img src={editBlue} width={20} alt="edit" />
                      </button>
                      <button title={t("delete")} onClick={() => remove(item.id)}>
                        <img src={trash} width={20} alt="delete" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <Rodal height={320} visible={visible} onClose={closeModal}>
        <div className="w-full h-full flex flex-col">
          <p className="text-xl border-b border-brGray leading-10 font-bold text-textBlack">
            {editId == null ? t("add_term") : t("editing")}
          </p>
          <div className="flex flex-col gap-3 mt-4">
            <TextField
              value={name}
              onChange={(e) => { setName(e.target.value); if (errors.name) setErrors({ ...errors, name: "" }); }}
              label={t("term_name")}
              placeholder={t("enter")}
              error={Boolean(errors.name)}
              helperText={errors.name || ""}
              sx={INPUT_CLASSES}
            />
            <TextField
              value={year}
              onChange={(e) => { setYear(e.target.value); if (errors.year) setErrors({ ...errors, year: "" }); }}
              label={t("term_year")}
              type="number"
              placeholder="2026"
              error={Boolean(errors.year)}
              helperText={errors.year || ""}
              sx={INPUT_CLASSES}
            />
            <TextField
              value={term}
              onChange={(e) => { setTerm(e.target.value); if (errors.term) setErrors({ ...errors, term: "" }); }}
              label={t("term_number")}
              type="number"
              placeholder="1-4"
              error={Boolean(errors.term)}
              helperText={errors.term || ""}
              sx={INPUT_CLASSES}
            />
            <div className="mt-2">
              <BUTTON name={t("save")} active buttonFunction={save} />
            </div>
          </div>
        </div>
      </Rodal>
    </div>
  );
}

export default Terms;
