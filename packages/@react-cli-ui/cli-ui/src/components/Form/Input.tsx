import React from 'react'

export interface InputInterface {
    label: string;
    name: string;
    value: any;
    onChange: (e: React.FormEvent<HTMLInputElement>) => void
}

export default function Input ({ label, name, value, onChange }) {
  return (
    <div className="input__wrapper">
      <label className="input__title">{label}</label>
      <input name={name} type="text" value={value} onChange={onChange}/>
    </div>
  )
}
