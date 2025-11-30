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

const ROOM_ID = "main_room"; // 1ルーム固定

// 付箋1枚分のコンポーネント
function StickyEditor({
    note,
    onSaved,
}: {
    note: Note | null;
    onSaved: (saved: Note) => void;
}) {
    const [isEditing, setIsEditing] = useState(false);
    const [value, setValue] = useState(note?.content ?? "");
    const [saving, setSaving] = useState(false);

    // props の note が変わったら中身を同期
    useEffect(() => {
        setValue(note?.content ?? "");
    }, [note?.id, note?.content]);

    const handleClick = () => {
        setIsEditing(true);
    };

    const handleBlur = async () => {
        setIsEditing(false);

        const text = value.trim().slice(0, 80);

        // 何も書いてない & 既存 note なし → 何もしない
        if (!text && !note) return;

        setSaving(true);

        if (note) {
            // 既存の付箋を更新
            const { data, error } = await supabase
                .from("notes")
                .update({ content: text })
                .eq("id", note.id)
                .select("*")
                .single();

            console.log("=== DEBUG update ===");
            console.log("data:", data);
            console.log("error:", error);

            setSaving(false);

            if (error) {
                console.error("update error:", error);
                return;
            }
            onSaved(data as Note);
        } else {
            // 新しい付箋として保存
            const { data, error } = await supabase
                .from("notes")
                .insert({
                    room_slug: ROOM_ID,
                    content: text,
                    color: "yellow",
                })
                .select("*")
                .single();

            setSaving(false);

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
                    {value || (saving ? "保存中..." : "ここに書き込み")}
                </p>
            )}
        </div>
    );
}

export default function Room_create() {
    const [notes, setNotes] = useState<Note[]>([]);
    const [qrDataUrl, setQrDataUrl] = useState("");

    // 初期読み込み（このルームの付箋を全部取得）
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

    // QRコード生成
    useEffect(() => {
        const generateQR = async () => {
            try {
                const url = `${window.location.origin}/Room`; // このページのURL
                const dataUrl = await QRCode.toDataURL(url);
                setQrDataUrl(dataUrl);
            } catch (e) {
                console.error("QR generate error:", e);
            }
        };
        generateQR();
    }, []);

    // グリッドには常に6枚並べる。足りないところは null で埋める
    const slots: (Note | null)[] = Array.from({ length: 6 }).map(
        (_, i) => notes[i] ?? null
    );

    const handleSaved = (index: number, saved: Note) => {
        setNotes((prev) => {
            const next = [...prev];
            // index位置に note があれば置き換え、なければ末尾に追加
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

            {/* 付箋グリッド */}
            <div className="grid grid-cols-2 gap-2.5 w-4/5 mx-auto mt-12">
                {slots.map((note, i) => (
                    <StickyEditor
                        key={note?.id ?? `slot-${i}`}
                        note={note}
                        onSaved={(saved) => handleSaved(i, saved)}
                    />
                ))}
            </div>

            {/* 右下のQRコード */}
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