// typings.d.ts or router.ts
import "vue-router";

declare module "vue-router" {
    interface RouteMeta {
        // 是可选的
        title?: string;
        requiresAuth?: boolean;
        requiresNoAuth?: boolean;
    }
}
