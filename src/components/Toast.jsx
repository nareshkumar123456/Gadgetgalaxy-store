import { useStore } from '../context/StoreContext';

export default function Toast() {
  const { toast } = useStore();
  
  return (
    <div id="toast" className={toast.show ? 'show' : ''}>
      <span className="tico">✅</span>
      <span>{toast.msg}</span>
    </div>
  );
}
