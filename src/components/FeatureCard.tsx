import * as React from "react";

interface FeatureCardProps {
  title: string;
  description: string;
  className?: string;
}

export const FeatureCard: React.FC<FeatureCardProps> = ({
  title,
  description,
  className = "",
}) => {
  const [firstWord, ...restWords] = title.split(" ");

  return (
    <div
      className={`p-6 bg-gradient-to-b from-[#1d1d1f] to-[#0d0d0d] text-white rounded-full shadow-md bg-[#000000] hover:!bg-black hover:!bg-none hover:shadow-[inset_0_0_20px_#0dd3ff] border border-[#44464a] transition-all duration-300 ease-in-out ${className}`}
    >
      <div className="flex items-start font-poppins justify-between max-md:flex-col max-md:gap-4">
        {/* Title Section */}
        <div className="flex-shrink-0 max-w-[20%] max-md:max-w-full">
          <h6 className="text-lg pt-1 font-bold">
            <span className="block">{firstWord}</span>
            <span className="block">{restWords.join(" ")}</span>
          </h6>
        </div>

        {/* Description Section */}
        <p
          className="text-sm font-poppins text-gray-300 max-w-[70%] max-md:max-w-full"
          style={{
            display: "-webkit-box",
            WebkitLineClamp: 10,
            WebkitBoxOrient: "vertical",
            overflow: "hidden",
          }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

// import * as React from "react";

// interface FeatureCardProps {
//   title: string;
//   description: string;
//   className?: string;
// }

// export const FeatureCard: React.FC<FeatureCardProps> = ({
//   title,
//   description,
//   className = "",
// }) => {
//   const [firstWord, ...restWords] = title.split(" ");

//   return (
//     <div
//       className={`p-6 bg-gradient-to-b from-[#1d1d1f] to-[#0d0d0d] text-white rounded-full shadow-md bg-[#000000] hover:!bg-black hover:!bg-none hover:shadow-[inset_0_0_20px_#0dd3ff] border border-[#44464a] transition-all duration-300 ease-in-out ${className}`}
//     >
//       <div className="flex items-start font-poppins justify-between max-md:flex-col max-md:gap-4">
//         {/* Title Section */}
//         <div className="flex-shrink-0 max-w-[20%] max-md:max-w-full">
//           <h6 className="text-lg pt-1 font-bold">
//             <span className="block">{firstWord}</span>
//             <span className="block">{restWords.join(" ")}</span>
//           </h6>
//         </div>

//         {/* Description Section */}
//         <p
//           className="text-sm font-poppins text-gray-300 max-w-[70%] max-md:max-w-full"
//           style={{
//             display: "-webkit-box",
//             WebkitLineClamp: 10,
//             WebkitBoxOrient: "vertical",
//             overflow: "hidden",
//           }}
//         >
//           {description}
//         </p>
//       </div>
//     </div>
//   );
// };
