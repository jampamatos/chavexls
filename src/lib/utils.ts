/** Concatenate CSS class names, ignoring falsey values */
export function cn(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(' ');
}