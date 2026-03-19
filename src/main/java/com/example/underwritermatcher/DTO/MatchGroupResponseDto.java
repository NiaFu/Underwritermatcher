package com.example.underwritermatcher.dto;

import java.util.List;

public class MatchGroupResponseDto {

    private List<MatchResultDto> high;
    private List<MatchResultDto> mid;
    private List<MatchResultDto> low;

    public MatchGroupResponseDto(List<MatchResultDto> high,
                                 List<MatchResultDto> mid,
                                 List<MatchResultDto> low) {
        this.high = high;
        this.mid = mid;
        this.low = low;
    }

    public List<MatchResultDto> getHigh() {
        return high;
    }

    public List<MatchResultDto> getMid() {
        return mid;
    }

    public List<MatchResultDto> getLow() {
        return low;
    }
}