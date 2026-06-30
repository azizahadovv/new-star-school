package com.nss.api;


import com.nss.service.FileService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/v1/files")
public class FileController {


    private final FileService fileService;

    public FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/{fileId}")
    public ResponseEntity<byte[]> getFile(@PathVariable Long fileId) {
        return fileService.getFile(fileId)
                .map(fileEntity -> ResponseEntity.ok()
                        .header("Content-Type", fileEntity.getFileType())
                        .header("Content-Disposition", "inline; filename=\"" + fileEntity.getFileName() + "\"")
                        .body(fileEntity.getData()))
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).body(null));
    }
    @PostMapping(value = "/upload",consumes = {"multipart/form-data"})
    public Long upload(@RequestPart("file") MultipartFile file){
        return fileService.storeFile(file);
    }
}
