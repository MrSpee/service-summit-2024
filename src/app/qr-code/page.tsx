import QRCodeGenerator from '@/components/QRCodeGenerator'

export default function QRCodePage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6 text-center">Quiz QR-Code Generator</h1>
      <QRCodeGenerator />
    </div>
  )
}