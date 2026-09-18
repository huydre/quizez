package com.quizez.api;

import org.junit.jupiter.api.Test;
import org.springframework.modulith.core.ApplicationModules;

/**
 * Verifies feature-module boundaries: code in {@code <feature>/internal/}
 * must not be referenced from other feature modules.
 */
class ArchitectureTests {

  @Test
  void verifyModuleBoundaries() {
    ApplicationModules.of(ApiApplication.class).verify();
  }
}
