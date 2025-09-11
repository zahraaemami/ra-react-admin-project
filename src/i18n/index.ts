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