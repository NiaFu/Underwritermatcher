package com.example.underwritermatcher.service;

import com.example.underwritermatcher.dto.MatchResultDto;
import com.example.underwritermatcher.entity.IndustryInsuranceUnderwriter;
import com.example.underwritermatcher.entity.Underwriter;
import com.example.underwritermatcher.repository.IndustryInsuranceUnderwriterRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MatchService {

    private final IndustryInsuranceUnderwriterRepository mappingRepository;

    /*
    * Constructor for MatchService
    * @param mappingRepository the repository for industry insurance underwriters
    */
    public MatchService(IndustryInsuranceUnderwriterRepository mappingRepository) {
        this.mappingRepository = mappingRepository;
    }

    /*
    * Find matches by industry id and insurance id
    * @param industryId the industry id
    * @param insuranceId the insurance id
    * @return a list of match results
    */
    public List<MatchResultDto> findMatches(Long industryId, Long insuranceId) {
        List<IndustryInsuranceUnderwriter> mappings =
                mappingRepository.findByIndustry_IdAndInsurance_Id(industryId, insuranceId);

        return mappings.stream().map(mapping -> {
            Underwriter u = mapping.getUnderwriter();
            return new MatchResultDto(
                    u.getId(),
                    u.getName(),
                    u.getContactPerson(),
                    u.getEmail(),
                    u.getPhone(),
                    u.getWeb(),
                    u.getAddress()
            );
        }).toList();
    }
}