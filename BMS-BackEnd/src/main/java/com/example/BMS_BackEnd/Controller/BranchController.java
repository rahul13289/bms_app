package com.example.BMS_BackEnd.Controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.example.BMS_BackEnd.Model.BranchDetails;
import com.example.BMS_BackEnd.Service.BranchService;

@CrossOrigin(origins = {"http://localhost:3000", "https://tiny-frangollo-907e03.netlify.app/"})
@RestController
public class BranchController {

    @Autowired
    private BranchService branchService;

    @PostMapping("/api/branches")
    public ResponseEntity<String> addBranch(@RequestBody BranchDetails data) {
        try {
            branchService.addBranchDetails(data);
            return ResponseEntity.ok("Branch added successfully");
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error adding branch: " + e.getMessage());
        }
    }

    @GetMapping("/api/branches")
    public ResponseEntity<List<BranchDetails>> getAllBranches() {
        try {
            List<BranchDetails> branches = branchService.getAllBranches();
            return ResponseEntity.ok(branches);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body(null);
        }
    }

    @GetMapping("/api/branches/{branchCode}")
    public ResponseEntity<?> getBranchByCode(@PathVariable("branchCode") String code) {
        try {
            BranchDetails branch = branchService.getBranchByCode(code);
            return ResponseEntity.ok(branch);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error fetching branch details: " + e.getMessage());
        }
    }

    @GetMapping("/api/branches/{branchCode}/history")
    public ResponseEntity<?> getBranchHistory(@PathVariable("branchCode") String code) {
        try {
            BranchDetails branch = branchService.getBranchByCode(code); // Replace with actual history logic
            return ResponseEntity.ok(branch);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                                 .body("Error fetching branch history: " + e.getMessage());
        }
    }
}
