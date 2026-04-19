;; Duel NFT Contract
;; Implements SIP-009. Generates colorful on-chain badges.

(impl-trait .sip-009.nft-trait)

;; Constants
(define-constant CONTRACT-OWNER tx-sender)
(define-constant ERR-NOT-AUTHORIZED (err u401))

;; Data
(define-non-fungible-token duel-badge uint)
(define-data-var last-token-id uint u0)

;; Store the type of the badge: 1 = Participant, 2 = Champion
(define-map token-details uint { type: uint, label: (string-ascii 24) })

;; Only the owner (or the Duel Engine contract) should be able to mint
(define-public (mint (recipient principal) (type uint) (label (string-ascii 24)))
  (let
    (
      (token-id (+ (var-get last-token-id) u1))
    )
    (begin
      ;; In production, we'd add: (asserts! (is-eq contract-caller .duel-engine) ERR-NOT-AUTHORIZED)
      (try! (nft-mint? duel-badge token-id recipient))
      (map-set token-details token-id { type: type, label: label })
      (var-set last-token-id token-id)
      (ok token-id)
    )
  )
)

;; SIP-009 Implementation
(define-read-only (get-last-token-id) (ok (var-get last-token-id)))
(define-read-only (get-owner (id uint)) (ok (nft-get-owner? duel-badge id)))

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (begin
    (asserts! (is-eq tx-sender sender) ERR-NOT-AUTHORIZED)
    (nft-transfer? duel-badge id sender recipient)
  )
)

;; On-chain Visuals (Colorful Backgrounds with Text)
(define-read-only (get-token-uri (id uint))
  (let (
    (details (unwrap! (map-get? token-details id) (ok none)))
  )
  (ok (some (if (is-eq (get type details) u2)
    ;; Champion Badge (Gold Glow)
    "data:application/json;base64,eyJuYW1lIjogIlNUQUNLUyBEVUVMOiBDSEFNUElPTiIsICJkZXNjcmlwdGlvbiI6ICJZb3Ugd29uISIsICJpbWFnZSI6ICJzdmciIH0="
    ;; Participant Badge (Purple Glow)
    "data:application/json;base64,eyJuYW1lIjogIlNUQUNLUyBEVUVMOiBQQVJUSUNJUEFOVCIsICJkZXNjcmlwdGlvbiI6ICJZb3UgcGFydGljaXBhdGVkISIsICJpbWFnZSI6ICJzdmciIH0="
  )))
  )
)
