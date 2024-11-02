import Head from 'next/head';

export default function Disclaimer() {
  return (
    <div className="bg-gray-800 min-h-screen flex flex-col mx-auto justify-center max-w-4xl">
      <Head>
        <title>Disclaimer - QuickLit</title>
        <meta name="description" content="Disclaimer for QuickLit website" />
      </Head>

      <div className="container mx-auto px-4 py-10">
        <h1 className="text-4xl font-bold text-center text-red-600 mb-6">Disclaimer</h1>
        
        <div className="p-6 border rounded-lg shadow-md">
          <p className="text-lg text-gray-300 mb-4">
            QuickLit provides educational content sourced from various third-party platforms. 
            The information on this website is for general informational purposes only and should not be relied upon as professional advice.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-4">Ownership and Copyright</h2>
          <p className="text-lg text-gray-300 mb-4">
            All content displayed on the QuickLit website, including but not limited to text, graphics, logos, and images, 
            is the property of QuickLit or third parties. The content is provided &quot;as is&quot; without warranty of any kind.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-4">Educational Purposes</h2>
          <p className="text-lg text-gray-300 mb-4">
            The content on this website is intended solely for educational and informational purposes. 
            QuickLit does not claim ownership or responsibility for any content provided by third parties.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-4">Limitations of Liability</h2>
          <p className="text-lg text-gray-300 mb-4">
            In no event shall QuickLit be liable for any direct, indirect, incidental, special, consequential, 
            or punitive damages arising out of or relating to your access to or use of the website.
          </p>

          <h2 className="text-2xl font-semibold text-blue-700 mt-6 mb-4">Contact Us</h2>
          <p className="text-lg text-gray-300 mb-4">
            If you have any questions or concerns regarding this disclaimer, please contact us at: 
            <a href="mailto:support@quicklit.com" className="text-blue-600 hover:underline"> im.kusharsh@gmail.com</a>
          </p>

          <p className="mt-6 text-center text-gray-500">
            &copy; {new Date().getFullYear()} QuickLit. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
