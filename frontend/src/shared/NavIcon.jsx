// Sidebar navigatsiya ikonkalari — title kalitiga qarab oq line SVG qaytaradi.
// Barcha rollar (admin/teacher/student/director/deputy) shu yagona to'plamdan
// foydalanadi (Figma sidebar uslubi).
const S = {
  width: 22,
  height: 22,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.8,
  strokeLinecap: "round",
  strokeLinejoin: "round",
};

export default function NavIcon({ name }) {
  switch (name) {
    case "main_page":
      return (
        <svg {...S}><path d="M3 10.5 12 3l9 7.5" /><path d="M5 9.5V20h14V9.5" /><path d="M9.5 20v-6h5v6" /></svg>
      );
    case "class_schedule_home":
    case "time_table":
    case "my_schedule":
      return (
        <svg {...S}><rect x="3.5" y="5" width="17" height="16" rx="2.5" /><path d="M3.5 9.5h17M8 3v4M16 3v4" /></svg>
      );
    case "list_of_classes_home":
      return (
        <svg {...S}><rect x="3.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="3.5" width="7" height="7" rx="1.5" /><rect x="3.5" y="13.5" width="7" height="7" rx="1.5" /><rect x="13.5" y="13.5" width="7" height="7" rx="1.5" /></svg>
      );
    case "teacher_home":
      return (
        <svg {...S}><circle cx="12" cy="7.5" r="3.5" /><path d="M5 20c0-3.3 3.1-6 7-6s7 2.7 7 6" /></svg>
      );
    case "student_home":
      return (
        <svg {...S}><path d="M12 4 2.5 8.5 12 13l9.5-4.5L12 4z" /><path d="M6.5 10.5V15c0 1.5 2.5 3 5.5 3s5.5-1.5 5.5-3v-4.5M21.5 8.5v5" /></svg>
      );
    case "sciences":
      return (
        <svg {...S}><path d="M9 3v8.5a3.5 3.5 0 1 0 6 0V3M8 3h8M7 21h6" /><circle cx="12" cy="11.5" r="1" /></svg>
      );
    case "ratings_home":
    case "rating_home":
    case "my_grade":
      return (
        <svg {...S}><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 17.9 6.8 19.7l1-5.8L3.5 9.7l5.9-.9L12 3.5z" /></svg>
      );
    case "attendance":
    case "My_classes_mark":
      return (
        <svg {...S}><rect x="4.5" y="3.5" width="15" height="17" rx="2.5" /><path d="M8.5 3.5h7v3h-7z" /><path d="M8.5 12l2 2 4-4" /></svg>
      );
    case "personnel_home":
      return (
        <svg {...S}><rect x="3" y="7.5" width="18" height="12.5" rx="2.5" /><path d="M8.5 7.5V6a2.5 2.5 0 0 1 2.5-2.5h2A2.5 2.5 0 0 1 15.5 6v1.5" /></svg>
      );
    case "settings":
      return (
        <svg {...S}><circle cx="12" cy="12" r="3" /><path d="M19.4 13a1.7 1.7 0 0 0 .3 1.9l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.7 1.7 0 0 0-2.9 1.2V21a2 2 0 1 1-4 0v-.1A1.7 1.7 0 0 0 7 19.3l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.7 1.7 0 0 0-1.2-2.9H3a2 2 0 1 1 0-4h.1A1.7 1.7 0 0 0 4.7 7l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.7 1.7 0 0 0 1.9.3H9.5a1.7 1.7 0 0 0 1-1.5V3a2 2 0 1 1 4 0v.1a1.7 1.7 0 0 0 1 1.5 1.7 1.7 0 0 0 1.9-.3l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.7 1.7 0 0 0-.3 1.9V9.5a1.7 1.7 0 0 0 1.5 1H21a2 2 0 1 1 0 4h-.1a1.7 1.7 0 0 0-1.5 1z" /></svg>
      );
    case "personal_information_home":
    case "personal_information":
    default:
      return (
        <svg {...S}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-3.3 3.6-6 8-6s8 2.7 8 6" /></svg>
      );
  }
}
