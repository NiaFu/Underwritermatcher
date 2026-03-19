package com.example.underwritermatcher.service;

import com.example.underwritermatcher.dto.MatchGroupResponseDto;
import com.example.underwritermatcher.dto.MatchResultDto;
import com.example.underwritermatcher.entity.IndustryInsuranceUnderwriter;
import com.example.underwritermatcher.entity.Underwriter;
import com.example.underwritermatcher.repository.IndustryInsuranceUnderwriterRepository;
import com.example.underwritermatcher.repository.UnderwriterRepository;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class MatchService {

    private final IndustryInsuranceUnderwriterRepository mappingRepository;
    private final UnderwriterRepository underwriterRepository;

    public MatchService(IndustryInsuranceUnderwriterRepository mappingRepository,
                        UnderwriterRepository underwriterRepository) {
        this.mappingRepository = mappingRepository;
        this.underwriterRepository = underwriterRepository;
    }

    public MatchGroupResponseDto findMatchesByAppetite(Long industryId, Long insuranceId) {
        // High: both match
        List<IndustryInsuranceUnderwriter> highMappings =
                mappingRepository.findByIndustry_IdAndInsurance_Id(industryId, insuranceId);

        // Mid: one side match only
        List<IndustryInsuranceUnderwriter> industryOnlyMappings =
                mappingRepository.findByIndustry_Id(industryId);

        List<IndustryInsuranceUnderwriter> insuranceOnlyMappings =
                mappingRepository.findByInsurance_Id(insuranceId);

        Set<Long> highIds = highMappings.stream()
                .map(m -> m.getUnderwriter().getId())
                .collect(Collectors.toSet());

        Set<Long> midIds = new HashSet<>();

        for (IndustryInsuranceUnderwriter mapping : industryOnlyMappings) {
            Long underwriterId = mapping.getUnderwriter().getId();
            if (!highIds.contains(underwriterId)) {
                midIds.add(underwriterId);
            }
        }

        for (IndustryInsuranceUnderwriter mapping : insuranceOnlyMappings) {
            Long underwriterId = mapping.getUnderwriter().getId();
            if (!highIds.contains(underwriterId)) {
                midIds.add(underwriterId);
            }
        }

        // Low: all other underwriters not in high or mid
        Set<Long> usedIds = new HashSet<>();
        usedIds.addAll(highIds);
        usedIds.addAll(midIds);

        Map<Long, MatchResultDto> highMap = new LinkedHashMap<>();

        for (IndustryInsuranceUnderwriter mapping : highMappings) {
            Underwriter u = mapping.getUnderwriter();
            highMap.putIfAbsent(u.getId(), toDto(u, "High"));
        }

        List<MatchResultDto> high = new ArrayList<>(highMap.values());

        List<MatchResultDto> mid = underwriterRepository.findAll().stream()
                .filter(u -> midIds.contains(u.getId()))
                .map(u -> toDto(u, "Mid"))
                .toList();

        List<MatchResultDto> low = underwriterRepository.findAll().stream()
                .filter(u -> !usedIds.contains(u.getId()))
                .map(u -> toDto(u, "Low"))
                .toList();

        return new MatchGroupResponseDto(high, mid, low);
    }

    private MatchResultDto toDto(Underwriter u, String appetite) {
        return new MatchResultDto(
                u.getId(),
                u.getName(),
                u.getContactPerson(),
                u.getEmail(),
                u.getPhone(),
                u.getWeb(),
                u.getAddress(),
                appetite
        );
    }
}