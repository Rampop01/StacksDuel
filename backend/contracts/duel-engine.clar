;; StacksDuel Engine
;; The core logic for battles and reward distribution.

;; Error Codes
(define-constant ERR-NOT-FOUND (err u101))
(define-constant ERR-ALREADY-VOTED (err u102))
(define-constant ERR-DUEL-CLOSED (err u103))
(define-constant ERR-NOT-AUTHORIZED (err u104))

;; Storage
(define-map duels 
    uint 
    { 
        creator: principal, 
        title: (string-ascii 64), 
        options: (list 4 (string-ascii 32)),
        prediction: uint,
        active: bool,
        winner: (optional uint),
        total-votes: uint
    }
)

(define-map votes { duel-id: uint, voter: principal } { option: uint })
(define-data-var last-duel-id uint u0)

;; --- Public Functions ---

;; 1. CREATE DUEL
(define-public (create-duel (title (string-ascii 64)) (options (list 4 (string-ascii 32))) (prediction uint))
    (let (
        (new-id (+ (var-get last-duel-id) u1))
    )
    (begin
        (map-set duels new-id {
            creator: tx-sender,
            title: title,
            options: options,
            prediction: prediction,
            active: true,
            winner: none,
            total-votes: u1
        })
        (var-set last-duel-id new-id)
        
        ;; Record creator vote
        (map-set votes { duel-id: new-id, voter: tx-sender } { option: prediction })
        
        ;; Mint 'Participant' NFT to creator
        ;; Note: We use a 24-character string to match the NFT contract exactly
        (try! (contract-call? .duel-nft mint tx-sender u1 "CREATOR-INITIAL-PROPOSAL"))
        
        (print { event: "duel-created", id: new-id, creator: tx-sender })
        (ok new-id)
    )
    )
)

;; 2. VOTE
(define-public (vote (duel-id uint) (option uint))
    (let (
        (duel (unwrap! (map-get? duels duel-id) ERR-NOT-FOUND))
    )
    (begin
        ;; Check if duel is active
        (asserts! (get active duel) ERR-DUEL-CLOSED)
        
        ;; Check if already voted
        (asserts! (is-none (map-get? votes { duel-id: duel-id, voter: tx-sender })) ERR-ALREADY-VOTED)
        
        ;; Record Vote
        (map-set votes { duel-id: duel-id, voter: tx-sender } { option: option })
        
        ;; Update Vote Count
        (map-set duels duel-id (merge duel { total-votes: (+ (get total-votes duel) u1) }))
        
        ;; MINT NFT to Voter (Participation proof)
        (try! (contract-call? .duel-nft mint tx-sender u1 "VOTER-PARTICIPATION-RECD"))
        
        (print { event: "voted", duel-id: duel-id, voter: tx-sender })
        (ok true)
    )
    )
)

;; 3. RESOLVE (Close Duel and reward winners)
(define-public (resolve-duel (duel-id uint) (winning-option uint))
    (let (
        (duel (unwrap! (map-get? duels duel-id) ERR-NOT-FOUND))
    )
    (begin
        ;; Only the original creator can resolve
        (asserts! (is-eq tx-sender (get creator duel)) ERR-NOT-AUTHORIZED)
        (asserts! (get active duel) ERR-DUEL-CLOSED)

        ;; Close the duel
        (map-set duels duel-id (merge duel { active: false, winner: (some winning-option) }))
        
        ;; If creator predicted right, they get the Champion NFT!
        (if (is-eq (get prediction duel) winning-option)
            (begin 
                (try! (contract-call? .duel-nft mint (get creator duel) u2 "CHAMPION-DUEL-WINNER-IDX"))
                true
            )
            true
        )
        
        (ok true)
    )
    )
)

;; --- Read Only ---
(define-read-only (get-duel-details (id uint)) (map-get? duels id))
(define-read-only (has-voted (id uint) (user principal)) (is-some (map-get? votes { duel-id: id, voter: user })))
