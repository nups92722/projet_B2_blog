import Header from "./element_gabarit/header"
import Footer from "./element_gabarit/footer"
import './globals.css'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Header/>
        <div className='p-4 bg-red-700'>{children}</div>
        <Footer/>
      </body>
    </html>
  );
}


// import './globals.css'
// import Header from "./components/header"
// export default function RootLayout({
//   children,
// }: {
//   children: React.ReactNode
// }) {
//   return (
//     <html lang="en">
//       {/*
//         <head /> will contain the components returned by the nearest parent
//         head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
//       */}
//       <head />
//       <body>
//         <Header/>
//         <p>Layout.tsx</p>
//         <div className='p-4 bg-red-700'>{children}</div>
//       </body>
//     </html>
//   )
// }
