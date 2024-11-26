import type { ReactNode } from "react";

type WhenProps = {
    condition?: boolean;
    children?: ReactNode;
    fallback?: ReactNode;
};
export function When({ condition, children, fallback }: WhenProps) {
    return condition ? children : fallback || null;
}