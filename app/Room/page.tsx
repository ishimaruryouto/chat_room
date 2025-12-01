"use client";

import QRCode from "qrcode";
import { useEffect, useState } from "react";
import { supabase } from "@/supabase/supabase";

type Note = {
    id: number;
    room_slug: string | null;
    content: string;
    color: string | null;
    created_at: string;
};

const ROOM_ID = "main_room";

function StickyEditor({
    note,
    onSaved,
}: {
    note: Note | null;
    onSaved: (saved: Note) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(note?.content ?? "");


    useEffect(() => {
        setValue(note?.content ?? "");
    }, [note]);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);

        const text = value.trim().slice(0, 80);

        if (!text && !note) return;


        if (note) {
            const { data, error } = await supabase
                .from("notes")
                .update({ content: text })
                .eq("id", note.id)
                .select("*")
                .single();

            console.log("=== DEBUG update ===");
            console.log("data:", data);
            console.log("error:", error);


            if (error) {
                console.error("update error:", error);
                return;
            }
            onSaved(data as Note);
        } else {

            const { data, error } = await supabase
                .from("notes")
                .insert({
                    room_slug: ROOM_ID,
                    content: text,
                    color: "yellow",
                })
                .select("*")
                .single();


            if (error) {
                console.error("insert error:", error);
                return;
            }
            onSaved(data as Note);
        }
    };

    return (
        <div
            className="relative flex items-center w-[150px] h-[150px] px-[2.2em] py-[2em] bg-[#fdf6af] text-[#333]
                before:absolute before:bottom-[-5px] before:right-[7px] before:-z-10 before:rotate-[5deg]
                before:w-[70%] before:h-[50%] before:bg-[#d0d0d0] before:blur-[4px] before:content-['']"
            onClick={handleClick}
        >
            {isEditing ? (
                <textarea
                    autoFocus
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={handleBlur}
                    maxLength={80}
                    className="w-full h-full bg-transparent resize-none outline-none text-sm leading-relaxed"
                    placeholder="ここに書き込み"
                />
            ) : (
                <p className="w-full h-full bg-transparent text-sm leading-relaxed break-words whitespace-pre-wrap">
                    {value || "ここに書き込み"}
                </p>
            )}
        </div>
    );
}

export default function Room_create() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [qrDataUrl, setQrDataUrl] = useState("");

    useEffect(() => {
        const loadNotes = async () => {
            const { data, error } = await supabase
                .from("notes")
                .select("*")
                .eq("room_slug", ROOM_ID)
                .order("id", { ascending: true });

            if (error) {
                console.error("loadNotes error:", error);
                return;
            }
            setNotes((data as Note[]) ?? []);
        };

        loadNotes();
    }, []);


    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = `${window.location.origin}/Room`;
                const dataUrl = await QRCode.toDataURL(url);
                setQrDataUrl(dataUrl);
            } catch (e) {
                console.error("QR generate error:", e);
            }
        };
        generateQR();
    }, []);

    const slots: (Note | null)[] = Array.from({ length: 6 }).map(
        (_, i) => notes[i] ?? null
    );

    const handleSaved = (index: number, saved: Note) => {
        setNotes((prev) => {
            const next = [...prev];
            if (next[index]) {
                next[index] = saved;
            } else {
                next.push(saved);
            }
            return next;
        });
    };

    return (
        <>
            <h1 className="text-4xl font-bold text-center mt-20">チャット欄</h1>


            <div className="grid grid-cols-2 gap-2.5 w-4/5 mx-auto mt-12">
                {slots.map((note, i) => (
                    <StickyEditor
                        key={note?.id ?? `slot-${i}`}
                        note={note}
                        onSaved={(saved) => handleSaved(i, saved)}
                    />
                ))}
            </div>


            <div className="fixed bottom-6 right-6 text-center">
                <p className="text-xs">ルームQRコード</p>
                {qrDataUrl && (
                    <img
                        src={qrDataUrl}
                        alt="QR Code"
                        className="w-26 h-26"
                    />
                )}
            </div>
        </>
    );
}