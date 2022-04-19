import { useState } from 'react';
import { sendToTab } from './utils';

export default function App() {
  const [message, setMessage] = useState('');

  const onSave = async () => {
    await sendToTab('save');
    setMessage('Saved!');
  };

  const onLoad = async () => {
    const res = await sendToTab('load');
    const mes = res || 'Loaded!';
    setMessage(mes);
  };

  const onClear = async () => {
    await sendToTab('clear');
    setMessage('Cleared!');
  };

  return (
    <div className="w-max">
      <header className="p-4 flex items-center text-white bg-gradient-to-r from-[#2D2D2D] to-[#525050]">
        <h1 className="text-5xl tracking-tighter font-semibold">asos</h1>
        <span className="ml-3 block text-xl">
          Brands <br /> Quick Save
        </span>
      </header>

      <main className="p-4">
        <div className="grid grid-cols-2 gap-4">
          <button
            onClick={onSave}
            className="p-2 text-white bg-[#018849] hover:bg-[#006637] tracking-widest font-semibold uppercase">
            Save
          </button>
          <button
            onClick={onLoad}
            className="p-2 border-2 border-gray-300 hover:bg-gray-100 tracking-widest font-semibold uppercase">
            Load
          </button>
        </div>

        <div className="mt-2 flex justify-between items-center">
          <span onClick={onClear} className="underline hover:cursor-pointer">
            Clear
          </span>
          <span className="font-bold">{message}</span>
        </div>
      </main>
    </div>
  );
}
