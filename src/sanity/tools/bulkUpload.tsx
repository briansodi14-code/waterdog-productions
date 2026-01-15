import { useCallback, useState } from "react";
import { useClient } from "sanity";
import {
  Card,
  Stack,
  Text,
  Button,
  Select,
  Checkbox,
  Flex,
  Box,
  Spinner,
} from "@sanity/ui";
import { UploadIcon, CheckmarkCircleIcon } from "@sanity/icons";

const LOCATIONS = ["HB Pier", "Newport", "San Clemente", "Laguna"] as const;

interface UploadState {
  total: number;
  completed: number;
  uploading: boolean;
  error: string | null;
  success: boolean;
}

export function BulkUploadTool() {
  const client = useClient({ apiVersion: "2024-01-01" });

  const [files, setFiles] = useState<File[]>([]);
  const [date, setDate] = useState(() => new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState<string>("HB Pier");
  const [featured, setFeatured] = useState(false);
  const [uploadState, setUploadState] = useState<UploadState>({
    total: 0,
    completed: 0,
    uploading: false,
    error: null,
    success: false,
  });

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFiles = Array.from(e.dataTransfer.files).filter((file) =>
      file.type.startsWith("image/")
    );
    setFiles((prev) => [...prev, ...droppedFiles]);
    setUploadState((prev) => ({ ...prev, success: false, error: null }));
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  }, []);

  const handleFileSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.target.files) {
        const selectedFiles = Array.from(e.target.files).filter((file) =>
          file.type.startsWith("image/")
        );
        setFiles((prev) => [...prev, ...selectedFiles]);
        setUploadState((prev) => ({ ...prev, success: false, error: null }));
      }
    },
    []
  );

  const removeFile = useCallback((index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  }, []);

  const clearFiles = useCallback(() => {
    setFiles([]);
    setUploadState({
      total: 0,
      completed: 0,
      uploading: false,
      error: null,
      success: false,
    });
  }, []);

  const handleUpload = useCallback(async () => {
    if (files.length === 0) return;

    setUploadState({
      total: files.length,
      completed: 0,
      uploading: true,
      error: null,
      success: false,
    });

    try {
      for (let i = 0; i < files.length; i++) {
        const file = files[i];

        // Upload the image asset
        const asset = await client.assets.upload("image", file, {
          filename: file.name,
        });

        // Create the photo document
        await client.create({
          _type: "photo",
          image: {
            _type: "image",
            asset: {
              _type: "reference",
              _ref: asset._id,
            },
          },
          date: date,
          location: location,
          featured: featured,
        });

        setUploadState((prev) => ({
          ...prev,
          completed: i + 1,
        }));
      }

      setUploadState((prev) => ({
        ...prev,
        uploading: false,
        success: true,
      }));
      setFiles([]);
    } catch (error) {
      setUploadState((prev) => ({
        ...prev,
        uploading: false,
        error: error instanceof Error ? error.message : "Upload failed",
      }));
    }
  }, [files, date, location, featured, client]);

  return (
    <Card padding={4} style={{ height: "100%", overflow: "auto" }}>
      <Stack space={5}>
        <Text size={4} weight="bold">
          Bulk Photo Upload
        </Text>
        <Text size={1} muted>
          Upload multiple photos at once with the same date and location.
        </Text>

        {/* Dropzone */}
        <Card
          padding={5}
          radius={2}
          shadow={1}
          tone={files.length > 0 ? "positive" : "default"}
          style={{
            border: "2px dashed",
            borderColor: files.length > 0 ? "#43d675" : "#ccc",
            cursor: "pointer",
            textAlign: "center",
          }}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <Stack space={3}>
            <Flex justify="center">
              <UploadIcon style={{ fontSize: 48, opacity: 0.5 }} />
            </Flex>
            <Text size={2} align="center">
              Drag & drop images here
            </Text>
            <Text size={1} muted align="center">
              or
            </Text>
            <Flex justify="center">
              <Button
                mode="ghost"
                text="Browse Files"
                onClick={() => document.getElementById("file-input")?.click()}
              />
            </Flex>
            <input
              id="file-input"
              type="file"
              multiple
              accept="image/*"
              style={{ display: "none" }}
              onChange={handleFileSelect}
            />
          </Stack>
        </Card>

        {/* Selected Files */}
        {files.length > 0 && (
          <Card padding={3} radius={2} tone="positive">
            <Stack space={3}>
              <Flex justify="space-between" align="center">
                <Text size={1} weight="semibold">
                  {files.length} image{files.length !== 1 ? "s" : ""} selected
                </Text>
                <Button
                  mode="ghost"
                  tone="critical"
                  text="Clear All"
                  onClick={clearFiles}
                  disabled={uploadState.uploading}
                />
              </Flex>
              <Box
                style={{
                  maxHeight: "150px",
                  overflow: "auto",
                }}
              >
                <Stack space={2}>
                  {files.map((file, index) => (
                    <Flex key={index} justify="space-between" align="center">
                      <Text size={1} muted style={{ wordBreak: "break-all" }}>
                        {file.name}
                      </Text>
                      <Button
                        mode="bleed"
                        tone="critical"
                        text="×"
                        onClick={() => removeFile(index)}
                        disabled={uploadState.uploading}
                        style={{ minWidth: "auto", padding: "4px 8px" }}
                      />
                    </Flex>
                  ))}
                </Stack>
              </Box>
            </Stack>
          </Card>
        )}

        {/* Settings */}
        <Card padding={4} radius={2} shadow={1}>
          <Stack space={4}>
            <Text size={2} weight="semibold">
              Photo Settings
            </Text>

            {/* Date */}
            <Stack space={2}>
              <Text size={1} weight="medium">
                Date Taken
              </Text>
              <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                disabled={uploadState.uploading}
                style={{
                  padding: "10px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                  width: "100%",
                  boxSizing: "border-box",
                }}
              />
            </Stack>

            {/* Location */}
            <Stack space={2}>
              <Text size={1} weight="medium">
                Location
              </Text>
              <Select
                value={location}
                onChange={(e) => setLocation(e.currentTarget.value)}
                disabled={uploadState.uploading}
              >
                {LOCATIONS.map((loc) => (
                  <option key={loc} value={loc}>
                    {loc}
                  </option>
                ))}
              </Select>
            </Stack>

            {/* Featured */}
            <Flex align="center" gap={3}>
              <Checkbox
                checked={featured}
                onChange={(e) => setFeatured(e.currentTarget.checked)}
                disabled={uploadState.uploading}
              />
              <Text size={1}>Featured on Homepage</Text>
            </Flex>
          </Stack>
        </Card>

        {/* Upload Button */}
        <Button
          tone="primary"
          text={
            uploadState.uploading
              ? `Uploading ${uploadState.completed} of ${uploadState.total}...`
              : `Upload ${files.length} Photo${files.length !== 1 ? "s" : ""}`
          }
          icon={uploadState.uploading ? Spinner : UploadIcon}
          onClick={handleUpload}
          disabled={files.length === 0 || uploadState.uploading}
          style={{ width: "100%" }}
        />

        {/* Progress/Status */}
        {uploadState.uploading && (
          <Card padding={3} radius={2} tone="primary">
            <Stack space={2}>
              <Flex align="center" gap={2}>
                <Spinner />
                <Text size={1}>
                  Uploading {uploadState.completed} of {uploadState.total}...
                </Text>
              </Flex>
              <Box
                style={{
                  height: "8px",
                  background: "#e0e0e0",
                  borderRadius: "4px",
                  overflow: "hidden",
                }}
              >
                <Box
                  style={{
                    height: "100%",
                    width: `${(uploadState.completed / uploadState.total) * 100}%`,
                    background: "#2276fc",
                    transition: "width 0.3s ease",
                  }}
                />
              </Box>
            </Stack>
          </Card>
        )}

        {uploadState.success && (
          <Card padding={3} radius={2} tone="positive">
            <Flex align="center" gap={2}>
              <CheckmarkCircleIcon style={{ color: "#43d675" }} />
              <Text size={1}>
                Successfully uploaded {uploadState.total} photo
                {uploadState.total !== 1 ? "s" : ""}!
              </Text>
            </Flex>
          </Card>
        )}

        {uploadState.error && (
          <Card padding={3} radius={2} tone="critical">
            <Text size={1}>Error: {uploadState.error}</Text>
          </Card>
        )}
      </Stack>
    </Card>
  );
}

// Tool definition for Sanity
export const bulkUploadTool = {
  name: "bulk-upload",
  title: "Bulk Upload",
  icon: UploadIcon,
  component: BulkUploadTool,
};
