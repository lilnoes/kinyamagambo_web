import { useState } from "react";
import useSWR from "swr";
import { fetcher } from "./fetch";

export default function useUser() {
    const { data } = useSWR("/api/user", fetcher);
    return data;
}