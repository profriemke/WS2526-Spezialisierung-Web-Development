"use client"
export default function Begruessung(props) {
    return (
        <p className="bg-sky-400 text-red-500 w-24 h-24 m-6 rounded-lg">
            Hallo {props.name}.
        </p>
    )
}