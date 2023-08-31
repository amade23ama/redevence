package sn.dscom.backend.controller;

import cyclops.control.Try;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import sn.dscom.backend.common.dto.ChargementDTO;
import sn.dscom.backend.common.dto.ExploitationDTO;
import sn.dscom.backend.common.dto.ReportingDTO;
import sn.dscom.backend.service.interfaces.IChargementService;

import java.util.List;
import java.util.Optional;

/**
 * ReportingController
 * @version 1
 * @author diome
 */
@RestController
@RequestMapping("/api/v1/reporting")
public class ReportingController {

    /** Logger Factory */
    private static final Logger LOGGER = LoggerFactory.getLogger(ReportingController.class);

    /**
     * chargement Service
     */
    @Autowired
    private IChargementService chargementService;

    /**
     * rechercher Reporting Chargemnet
     * @return la liste
     */
    @GetMapping(path = "/chargement")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULT','EDIT')")
    public ResponseEntity<List<ReportingDTO>> rechercherReportingChargemnet() {
        ReportingController.LOGGER.info("ExploitationController: rechercherSitesExploitation");
        Optional<List<ChargementDTO>> list = this.chargementService.rechercherChargements();

        // Appel du service rechercherSitesExploitation
        // si vide on retour une erreur 404
        return ResponseEntity.ok(null);
    }

    /**
     * rechercher Reporting Chargemnet
     * @return la liste
     */
    @GetMapping(path = "/produit")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULT','EDIT')")
    public ResponseEntity<List<ReportingDTO>> reportingProduitByExploitation() {
        ReportingController.LOGGER.info("ExploitationController: rechercherSitesExploitation");
        Optional<List<ChargementDTO>> list = this.chargementService.rechercherChargements();

        // Appel du service rechercherSitesExploitation
        // si vide on retour une erreur 404
        return ResponseEntity.ok(null);
    }

    /**
     * rechercher Reporting Chargemnet
     * @return la liste
     */
    @GetMapping(path = "/produit1")
    @PreAuthorize("hasAnyRole('ADMIN','CONSULT','EDIT')")
    public ResponseEntity<List<ReportingDTO>> reportingProduitByYear() {
        ReportingController.LOGGER.info("ExploitationController: rechercherSitesExploitation");
        Optional<List<ChargementDTO>> list = this.chargementService.rechercherChargements();

        // Appel du service rechercherSitesExploitation
        // si vide on retour une erreur 404
        return ResponseEntity.ok(null);
    }
}
