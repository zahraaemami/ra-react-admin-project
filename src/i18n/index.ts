import polyglotI18nProvider from "ra-i18n-polyglot";
import farsiMessages from "ra-language-farsi";

// پیام‌های فارسی اختصاصی برای resource های مهم
const defaultResourceMessages: any = {
  "base/admin/user": {
    name: "کاربر |||| کاربران",
    fields: {
      id: "شناسه",
      first_name: "نام",
      last_name: "نام خانوادگی",
      gender: "جنسیت",
      email: "ایمیل",
      mobile: "شماره موبایل",
      is_staff: "کارمند",
      is_active: "فعال",
      is_superuser: "مدیر کل",
    },
  },
  "base/city": {
    name: "شهر |||| شهرها",
    fields: {
      id: "شناسه",
      name: "نام شهر",
    },
  },
  "base/admin/company": {
    name: "شرکت |||| شرکت‌ها",
    fields: {
    id: "شناسه",
    name: "نام شرکت",
    hostname: "هاست",
    admin_hostname: "هاست ادمین",
    logo: "لوگو",
    badge_icon: "آیکون",
    about: "درباره",
    landing_footer_text: "متن فوتر",
    created_at: "تاریخ ایجاد",
    updated_at: "آخرین بروزرسانی",
    "admin_users[0].email": "ایمیل ادمین",
  },
},

};

// i18nProvider پویا با Proxy
export const i18nProvider = polyglotI18nProvider(
  (locale: string, messages?: any) => {
    return {
      ...farsiMessages,
      resources: new Proxy(defaultResourceMessages, {
        get(target, prop: string) {
          if (prop in target) return target[prop];
          // ایجاد خودکار resource جدید
          return {
            name: prop + " |||| " + prop,
            fields: {},
          };
        },
      }),
    };
  },
  "fa"
);