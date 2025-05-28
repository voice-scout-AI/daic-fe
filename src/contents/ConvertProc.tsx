// import { useEffect, useState } from 'react';
// import { useRecoilValue, useSetRecoilState } from 'recoil';
// import { stepState } from '@recoil/stepState';
// import { transformState } from '@recoil/transformState';
// import StepIndicator from '@components/StepIndicator';
// import { useNavigate } from 'react-router-dom';

// const ConvertProc = () => {
//   const navigate = useNavigate();
//   const setStep = useSetRecoilState(stepState);

//   const [progress, setProgress] = useState(0);

//   useEffect(() => {
//     setStep(2);

//     const interval = setInterval(() => {
//       setProgress((prev) => {
//         if (prev >= 100) {
//           clearInterval(interval);
//           setTimeout(() => navigate('/generate'), 1000); // 자동 이동
//           return 100;
//         }
//         return prev + 10;
//       });
//     }, 400);

//     return () => clearInterval(interval);
//   }, [navigate, setStep]);

//   return (
//     <div className="flex flex-col items-center min-h-screen px-4 pt-10 pb-24 bg-black">
//       <StepIndicator />

//       <div className="w-full px-6 py-8 mt-6 text-center bg-white shadow-md rounded-xl">
//         <h2 className="mb-4 font-bold text-subBlack">Step 2. Transform</h2>

//         <p className="mb-4 text-sm text-subBlack">
//           Converting from{' '}
//           <span className="font-bold text-pointGreen">
//             {fromFramework} {fromVersion}
//           </span>{' '}
//           to{' '}
//           <span className="font-bold text-pointGreen">
//             {toFramework} {toVersion}
//           </span>
//         </p>

//         <div className="w-full h-4 overflow-hidden bg-gray-200 rounded-full">
//           <div className="h-full transition-all duration-300 bg-pointGreen" style={{ width: `${progress}%` }} />
//         </div>
//         <p className="mt-2 text-sm te:xt-subBlack">{progress}%</p>
//       </div>
//     </div>
//   );
// };

// export default ConvertProc;
const ConvertProc = () => {
  return <div>구현 중</div>;
};

export default ConvertProc;
