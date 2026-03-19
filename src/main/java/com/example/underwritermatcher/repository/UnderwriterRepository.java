package com.example.underwritermatcher.repository;

import com.example.underwritermatcher.entity.Underwriter;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UnderwriterRepository extends JpaRepository<Underwriter, Long> {
}