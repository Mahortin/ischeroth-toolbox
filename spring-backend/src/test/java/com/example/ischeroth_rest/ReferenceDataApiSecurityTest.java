package com.example.ischeroth_rest;

import static org.mockito.Mockito.verifyNoInteractions;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.head;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.Optional;

import org.junit.jupiter.api.Test;
import org.junit.jupiter.params.ParameterizedTest;
import org.junit.jupiter.params.provider.ValueSource;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.context.annotation.Import;
import org.springframework.test.context.bean.override.mockito.MockitoBean;
import org.springframework.test.web.servlet.MockMvc;

import com.example.ischeroth_rest.config.SecurityConfig;
import com.example.ischeroth_rest.controller.AttributeController;
import com.example.ischeroth_rest.controller.NameController;
import com.example.ischeroth_rest.controller.SkillController;
import com.example.ischeroth_rest.model.Attribute;
import com.example.ischeroth_rest.model.Name;
import com.example.ischeroth_rest.model.Skill;
import com.example.ischeroth_rest.repository.AttributeRepository;
import com.example.ischeroth_rest.repository.NameRepository;
import com.example.ischeroth_rest.repository.SkillRepository;

@WebMvcTest({AttributeController.class, NameController.class, SkillController.class})
@Import(SecurityConfig.class)
class ReferenceDataApiSecurityTest {
    @Autowired
    private MockMvc mvc;

    @MockitoBean
    private AttributeRepository attributes;

    @MockitoBean
    private NameRepository names;

    @MockitoBean
    private SkillRepository skills;

    @ParameterizedTest
    @ValueSource(strings = {"/api/attributes", "/api/names", "/api/skills"})
    void allowsAnonymousReads(String path) throws Exception {
        mvc.perform(get(path)).andExpect(status().isOk());
        mvc.perform(head(path)).andExpect(status().isOk());
    }

    @Test
    void returnsExistingRecordsAsJson() throws Exception {
        Attribute attribute = new Attribute();
        attribute.setId(1L);
        Name name = new Name();
        name.setId(1L);
        Skill skill = new Skill();
        skill.setId(1L);
        when(attributes.findById(1L)).thenReturn(Optional.of(attribute));
        when(names.findById(1L)).thenReturn(Optional.of(name));
        when(skills.findById(1L)).thenReturn(Optional.of(skill));

        for (String path : new String[] {"/api/attributes/1", "/api/names/1", "/api/skills/1"}) {
            mvc.perform(get(path))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.id").value(1));
        }
    }

    @ParameterizedTest
    @ValueSource(strings = {"/api/attributes/1", "/api/names/1", "/api/skills/1"})
    void returnsNotFoundForMissingRecords(String path) throws Exception {
        mvc.perform(get(path)).andExpect(status().isNotFound());
    }

    @ParameterizedTest
    @ValueSource(strings = {"/api/attributes", "/api/names", "/api/skills"})
    void rejectsAnonymousWritesBeforeReachingRepositories(String path) throws Exception {
        mvc.perform(post(path).contentType("application/json").content("{}"))
            .andExpect(status().isForbidden());
        verifyNoInteractions(attributes, names, skills);
    }
}
