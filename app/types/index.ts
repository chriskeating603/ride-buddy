export type SafeUser = Omit<
    User,
    "createdAt" | "updatedAt"
> & {
    createdAt: string;
    updatedAt: string;
};
