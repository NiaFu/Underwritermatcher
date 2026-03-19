package com.example.underwritermatcher.controller;

import com.example.underwritermatcher.dto.MatchResultDto;
import com.example.underwritermatcher.entity.Industry;
import com.example.underwritermatcher.entity.Insurance;
import com.example.underwritermatcher.repository.IndustryRepository;
import com.example.underwritermatcher.repository.InsuranceRepository;
import com.example.underwritermatcher.service.MatchService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.example.underwritermatcher.dto.MatchGroupResponseDto;

import java.util.List;

@RestController
public class ApiController {

    private final IndustryRepository industryRepository;
    private final InsuranceRepository insuranceRepository;
    private final MatchService matchService;

    public ApiController(IndustryRepository industryRepository,
                         InsuranceRepository insuranceRepository,
                         MatchService matchService) {
        this.industryRepository = industryRepository;
        this.insuranceRepository = insuranceRepository;
        this.matchService = matchService;
    }

    /*
    * Get all industries
    * @return a list of industries
    */
    @GetMapping("/api/industries")
    public List<Industry> getIndustries() {
        return industryRepository.findAll();
    }

    /*
    * Get all insurances
    * @return a list of insurances
    */
    @GetMapping("/api/insurances")
    public List<Insurance> getInsurances() {
        return insuranceRepository.findAll();
    }

    /*
    * Get matches by industry id and insurance id
    * @param industryId the industry id
    * @param insuranceId the insurance id
    * @return a match group response dto
    */
    @GetMapping("/api/match")
    public MatchGroupResponseDto getMatches(@RequestParam Long industryId,
                                            @RequestParam Long insuranceId) {
        return matchService.findMatchesByAppetite(industryId, insuranceId);
    }
}