import { useState, useCallback } from "react";

export default function useToggle(initialState?: boolean) {
	"use client"
	const [state, setState] = useState(initialState || false);
	const toggleState = () => useCallback(() => setState(!state), [])
	return [state, toggleState] as const
}