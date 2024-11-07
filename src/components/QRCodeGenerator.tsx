'use client'

import React, { useState } from 'react'
import { QRCodeSVG } from 'qrcode.react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function QRCodeGenerator() {
  const [url, setUrl] = useState('https://example.com/quiz')
  const [qrSize, setQrSize] = useState(256)

  const handleDownload = () => {
    const svg = document.getElementById('qr-code')
    const svgData = new XMLSerializer().serializeToString(svg!)
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')
    const img = new Image()
    img.onload = () => {
      canvas.width = qrSize
      canvas.height = qrSize
      ctx!.drawImage(img, 0, 0)
      const pngFile = canvas.toDataURL('image/png')
      const downloadLink = document.createElement('a')
      downloadLink.download = 'qr-code.png'
      downloadLink.href = pngFile
      downloadLink.click()
    }
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData)
  }

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader>
        <CardTitle>QR-Code Generator</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <Input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Enter your quiz URL"
            className="w-full"
          />
          <div className="flex justify-center">
            <QRCodeSVG
              id="qr-code"
              value={url}
              size={qrSize}
              level="H"
              includeMargin={true}
            />
          </div>
          <div className="flex justify-between items-center">
            <Input
              type="number"
              value={qrSize}
              onChange={(e) => setQrSize(Number(e.target.value))}
              min="128"
              max="512"
              step="32"
              className="w-24"
            />
            <Button onClick={handleDownload}>Download QR Code</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}