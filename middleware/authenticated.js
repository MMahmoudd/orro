export default function({ store, redirect, app }) {
    if (!app.$cookies.get("token")) {
        return redirect(app.$cookies.get("i18n_redirected") + "/login");
    }
}