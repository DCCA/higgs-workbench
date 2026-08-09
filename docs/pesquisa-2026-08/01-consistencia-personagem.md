# Character Consistency in AI Video Production - State of the Art (verified via web, August 2026)

All claims below were verified via web search/fetch this session. Dates are the publication dates found on the sources.

---

## 1. Reference-based identity locking (multi-image reference stacks)

The 2025-2026 consensus: **text describes a character, references hold it**. Every major platform now has a native reference slot, and the working recipes differ by platform.

### Per-platform recipes

**Runway Gen-4 References** (official Runway guide, Dec 19, 2025)
- Start with ONE high-quality reference; add 2-3 of the same character (front, profile, 3/4) only when you need varied camera work.
- Reference spec: min 1024px on the shortest side, sharp focus on the face, even lighting, no harsh shadows, no filters, no extreme angles (never straight up/down), no obstructions. Generating a clean AI reference with controlled lighting is explicitly recommended over a casual photo.
- Prompt formula: "Character from reference + setting + action + lighting" - the reference carries appearance, the prompt carries everything else. Do NOT re-describe the face in the prompt (contradicting the reference is listed as a top mistake).
- Gen-4 supports up to 3 reference images; label them "image_1/image_2/image_3" in the prompt to bind each input to a role.
- Sources: https://runway.com/resources/ai-character-references-tips (2025-12-19); https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References; https://runway.com/research/introducing-runway-gen-4

**Google Veo 3.1 "Ingredients to Video"** (official Google Cloud prompting guide, Oct 16, 2025)
- Two-step workflow: (1) generate the "ingredients" first with an image model (Google's guide uses Gemini 2.5 Flash Image / Nano Banana) - one image per character + one per setting; (2) compose each shot passing all ingredients plus a prompt that explicitly says "Using the provided images for the detective, the woman, and the office setting, create a medium shot of...".
- Three-pillar stack: subject/character image + environment image + style/texture image.
- First/Last Frame feature for controlled transitions: generate both stills first, then animate between them.
- Sources: https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1 (2025-10-16); https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/

**Kling "Elements" / Kling 3.0** (Kling official quickstart + 2026 guides)
- Upload 1-4 images (guides recommend 4-6 for complex motion), select subjects as "elements", then bind them in the prompt with tag syntax: `<<<element_1>>> as Luna, the same 7-year-old girl from the reference`.
- Match the reference angle to the shot: side-face ref for a walk-past shot, front-face ref for a to-camera shot; upload both when the model allows.
- Image Relevance/Strength slider at 0.7-0.8 to force face adherence.
- Rule of thumb quoted across guides: "references carry identity; prompts direct action."
- Sources: https://app.klingai.com/global/quickstart/ai-video-character-consistency; https://magichour.ai/blog/kling-30-reference-guide (2026); https://www.atlascloud.ai/blog/guides/how-to-use-kling-3.0-for-character-consistency (2026)

**Bytedance Seedance 2.0 "Omni Reference"** (2026 guides)
- Up to 9 images + 3 videos + 3 audio files, each addressed in the prompt with `@img1`, `@vid1` mentions so the model knows exactly what each file contributes (this is face, this is camera move, this is music).
- Community sweet spot: 3-5 core images + 1-2 video refs + 1 audio. Using all 12 slots overloads the model ("satisfies every constraint and none well").
- Character-sheet pattern: keep slots 1-2 as fixed character refs across ALL generations; vary slots 3-4 per scene.
- Sources: https://seedance2pro.io/blog/seedance-2-omni-reference (2026); https://www.glbgpt.com/hub/seedance-2-0-omni-reference/; https://medium.com/@social_18794/how-to-keep-character-consistency-in-seedance-2-0-reference-pack-rules-5bb8fdc0add7

**Midjourney V7 Omni-Reference (`--oref` + `--ow`)** - image side of the pipeline
- Single front-facing anchor image, neutral pose, even lighting. Tune `--ow` (omni-weight) 200-400: raise if the face drifts, lower if the scene gets over-locked.
- Key limitation everyone repeats: Midjourney's lock is image-only - the locked still is then animated with Veo Ingredients / Runway References / Kling Elements. "Animating from a locked still gives far better consistency than text-to-video."
- Sources: https://flowith.io/blog/midjourney-v7-consistent-characters-masterclass/; https://flick.art/blog/img2img-consistent-character/midjourney (2026)

### Cross-platform ref best practices (consensus)
- 3-5 images of the same character: front, 3/4, profile, plus one close-up; identical lighting and style across the set.
- Lighting-neutral, clean background, high-res, face sharp. Backlighting, clutter, and low-res weaken identity anchoring (Runway explicitly, echoed everywhere).
- Sources: https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video (2026); https://motion.verticalstudio.ai/blog/ai-character-consistency-guide (2026)

---

## 2. Character sheets / turnarounds BEFORE production

Yes - generating a character sheet before any video generation is now standard practice among AI filmmakers, and the sheet is a working production asset, not decoration.

**The recipe (pIXELsHAM, Apr 18, 2026 - Nano Banana/ChatGPT character sheet for AI video):**
- White, clean, minimalist background ("flat studio look with sharp edges", no dramatic lighting).
- Left: full-body front, side, back at identical proportions, clothing, and height.
- Upper right: six head-angle studies (front, side, back, 3/4, overhead, profile).
- Lower right: six close-up detail crops (fabric texture, footwear, eyes, skin, hip/lower body).
- Style clause: "professional character design sheet, like a game art or fashion reference board."
- Usage: the whole sheet is loaded into Seedance 2.0 (or similar) as a single reference image; the model "pulls the character from it" using the multi-angle data.
- Source: https://www.pixelsham.com/2026/04/18/creating-a-character-sheet-for-ai-videos-using-nano-banana/ (2026-04-18)

**Prompt structure for turnarounds** (banana-prompts / Scenario): style (optional) + clear character description + technical clause: "character design sheet with multiple views (front, side, back), orthographic camera, consistent lighting." Expression sheets add a strip of neutral/happy/angry/sad/shocked while holding facial structure, hair, and outfit fixed.
- Sources: https://www.banana-prompts.net/character-turnaround-ai-prompt/; https://www.scenario.com/blog/generate-character-turnarounds-scenario

**How the sheet is used downstream** - two modes:
1. Whole sheet as one reference image (Seedance-style models can parse it).
2. Sheet cut into 10-15 clean crops used as a LoRA training dataset (see topic 3) or as an angle-matched pool: pick the sheet view matching each shot's camera angle as that shot's reference.
- Sources: https://thefluxtrain.com/blog/noobs-guide-to-flux-lora-training/; https://www.aiforfilmaking.com/2025/12/how-to-achieve-character-consistency-in.html (2025-12)

**Curious Refuge's taught workflow** (their "Ultimate Guide to Creating Consistent AI Characters" + AI Filmmaking course): Midjourney omni-reference to generate variations, Ideogram magic-fill on the face for facial accuracy, Seedream (via Freepik) for wardrobe changes, Photoshop Harmonize to match lighting to the plate, then animate (Seedance Pro). This is a still-first pipeline: identity is fully resolved in images before a single video credit is spent.
- Source: https://curiousrefuge.com/blog/how-to-create-consistent-ai-characters

---

## 3. Trained character models (LoRA and platform-native training)

**When training beats reference stacks (2026 consensus):** references won the default; training wins at volume. "LoRA training is no longer the default starting point... reference-based conditioning has largely replaced it for comics, social content, brand mascots." But "if the character will appear dozens or hundreds of times, train a LoRA - identity baked into weights survives pose/outfit/environment changes far better than references do."
- Sources: https://magichour.ai/blog/best-ai-image-generators-for-character-consistency (2026); https://flick.art/blog/img2img-consistent-character (2026)

**Flux/SDXL/Wan LoRA recipe (feeding i2v):**
- Dataset: 10-20 high-res images, varied angles/poses/expressions, varied lighting (Ostris method: 12-20). One documented trick: generate one character sheet, cut it into 10-15 crops = instant dataset.
- The LoRA is used as a STILL generator: every shot's start frame comes from the LoRA-locked character, then i2v (Kling/Veo/Wan) animates it. Wan 2.2 also supports LoRAs applied directly in i2v.
- Sources: https://thefluxtrain.com/blog/noobs-guide-to-flux-lora-training/; https://apatero.com/blog/flux-2-pro-lora-training-character-consistency-2026 (2026); https://wan27.org/blog/wan-2-2-lora-training-guide (2026); https://www.runflow.io/blog/comfyui-consistent-characters-flux (2026)

**Platform-native training - Higgsfield Soul ID** (official Higgsfield docs/blog):
- Minimum ~20 high-quality photos: varied angles, multiple expressions, at least one full-height shot for body proportions; consistent lighting; no sunglasses, heavy shadows, or cropped faces. Quality beats quantity.
- Training takes ~3-5 minutes; the named character is then selected in the Character tab and applies across every Soul 2.0 generation and every Higgsfield model indefinitely - no re-uploading, no re-describing.
- Sources: https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-create-and-use-a-soul-id-character; https://higgsfield.ai/blog/Soul-ID-AI-Character-Consistency; https://digitalzoomstudio.net/2026/03/train-a-consistent-character-in-higgsfield-soul/ (2026-03)

---

## 4. Identity drift mitigation

**What breaks identity** (documented failure modes):
- i2v face morph: a start-frame only seeds frame 1; its influence fades as the clip plays - 5s holds, 30s wanders (invideo, 2026).
- Rewritten descriptions: "most drift comes from people rewriting character descriptions from memory" between shots (magichour, 2026).
- Stale/missing character sheet: face drift across shots traced to not re-attaching the sheet on every generation (dev.to).
- Tone/skin drift in close-ups when skipping an anchor still and going straight from character refs + voiceover (invideo anchor-frame doc, Jul 2026).
- Sources: https://invideo.io/blog/ai-character-consistency-video/; https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video; https://invideo.io/blog/anchor-frame-method-ai-video/ (updated 2026-07-15)

**Working antidotes:**

1. **Anchor Frame Method** (invideo, updated Jul 15, 2026): generate ONE approved photoreal still of the character at the target location; iterate on the image only (framing, wardrobe, lighting) because "image iterations are cheap, video iterations are not"; lock it by version number; feed the locked frame into every clip's keyframe/reference slot with a per-beat instruction for camera and action. Reuse the same anchor per location; cut a NEW anchor per scene change or scale change. Source: https://invideo.io/blog/anchor-frame-method-ai-video/

2. **Full-context prompts, every shot** (PJ Accetturo/PJ Ace, Kalshi NBA Finals ad, Veo 3, Jun 2025): treat each prompt as standalone - re-paste the complete character/setting/tone description into every single prompt "as if Veo has no memory of the shot before or after." He uses Gemini to expand each script beat into a full detailed paragraph, max 5 prompts per LLM batch before quality slips. Reality check on volume: 300-400 generations for 15 usable clips. Sources: https://www.marktechpost.com/2025/06/14/ai-generated-ad-created-with-googles-veo3-airs-during-nba-finals-slashing-production-costs-by-95/ (2025-06-14); https://www.thedaringcreatives.com/creator-stories/pj-ace-made-an-nba-finals-ad-for-2-000-and-published-the-prompts/

3. **Frozen identity text block**: write the character description once, store it, paste verbatim - "freezing the text removes an entire category of variation" (magichour, 2026).

4. **Frame chaining / "handshake method"**: export a clean face-visible frame from clip N, use it as the reference/start frame for clip N+1. Reduces drift across sequences but degrades over long chains, so pros chain from the APPROVED anchor, not from each other, when possible. Sources: https://www.kittl.com/blogs/ai-video-character-consistency-workflow/; https://invideo.io/blog/ai-character-consistency-video/

5. **Angle-matched references**: pick the sheet view matching the shot's camera angle instead of always the front view (Kling guides, aiforfilmaking Dec 2025).

6. **Named-practitioner note**: The Dor Brothers (Deadline interview, Dec 2025) use Seedance 2.0 specifically for cross-shot visual continuity, plus heavy generate-and-select (hundreds of takes) and retro/VHS filters to mask residual imperfection - drift hidden in the grade is a legitimate tool. Sources: https://deadline.com/2025/12/the-dor-brothers-interview-hollywood-joe-rogan-snoop-dogg-1236634355/ (2025-12); https://gigazine.net/gsc_news/en/20250731-dor-video-studio-ai/ (2025-07-31)

7. **System over software** - Neural Viz (Monoverse): consistency via a persistent asset universe - characters, locations, and lore are generated once, then reused across episodes; the creator performs the roles and maps face/voice onto his own performance (Act-One-style), which keeps identity anchored to a real human's face geometry. Sources: https://www.thedaringcreatives.com/creator-stories/the-showrunner-how-neural-viz-makes-an-entire-tv-universe-with-ai/; https://a16z.com/ai-avatars/

Note: same-seed policies barely appear in 2026 guidance for video - seeds don't survive across shots/models; the field converged on reference locking + anchor stills instead.

---

## 5. What gets FROZEN, and WHEN

The 2026 pipeline literature converges on a hard pre-production freeze, before the first video credit is spent:

- **Character lock (pre-production):** character bible with 15-20 written physical attributes + 8-10 approved reference images generated BEFORE any scene work (cinemadrop 2026). The Higgsfield/Soul equivalent: the trained character IS the lock artifact.
- **Look lock (pre-production):** the film's look written down before any image generation - film stock, grain, lens character, tonal curve - and used on every generation (frameo.ai).
- **Wardrobe/props lock:** every recurring object gets its own locked spec/reference ("treat props as narrative objects, not set dressing"); wardrobe drift is handled by outfit-specific reference images or outfit variants bound to a Character object.
- **Per-scene anchor lock (production):** the approved anchor still per location, locked by version number (invideo Jul 2026) - shots derive from it, never from fresh text-to-video.
- **The lock artifact in practice** is threefold: (1) a folder of approved reference images (character sheet + anchors, versioned); (2) a frozen identity text block pasted verbatim into every prompt; (3) where the platform supports it, a persistent Character object / trained ID (Higgsfield Soul ID, Kling character, astorie Character objects) binding identity + persona + outfit variants across models.
- Sources: https://www.cinemadrop.com/blog/how-to-create-consistent-ai-characters-the-complete-guide-for-ai-filmmakers-in-2026 (2026); https://frameo.ai/blog/ai-film-pipeline-script-to-screen/; https://astorie.ai/blog/how-to-build-consistent-ai-character (2026); https://invideo.io/blog/anchor-frame-method-ai-video/ (2026-07)

---

## TOP 10 practices, ranked by evidence strength

1. **Resolve identity in stills, animate the approved still (i2v), never text-to-video for character shots.** Strongest consensus - official Google, Runway, Midjourney-to-video guides, Curious Refuge, invideo, and every 2026 roundup say the same thing.
2. **Anchor Frame Method: one approved, version-locked still per character-per-location; every clip derives from it.** Documented as a named method with steps and failure evidence (tone drift when skipped). (invideo 2026, Kittl 2026)
3. **Let references carry identity, prompts carry action - never re-describe the face against a reference.** Stated verbatim in Runway's official guide (Dec 2025) and Kling guides.
4. **Reference stack of 3-5 same-character images (front, 3/4, profile, close-up), identical neutral lighting, clean background, 1024px+.** Runway official specs + cross-platform consensus.
5. **Frozen identity text block re-pasted in full into every prompt.** Proven at broadcast scale by PJ Accetturo's Kalshi NBA Finals ad (Veo 3, Jun 2025, published prompts); echoed by magichour's "rewriting from memory causes drift."
6. **Generate a character sheet (front/side/back turnaround + head angles + detail close-ups on white) before production, and attach it as a reference on every shot.** Concrete recipe documented (pIXELsHAM Apr 2026); dual use as reference and LoRA dataset.
7. **Platform-native character training for recurring characters: ~20 varied photos incl. one full-body, ~3-5 min training, identity persists across all future generations (Higgsfield Soul ID).** Official platform docs; the strongest lock available when you'll reuse a character many times.
8. **Seedance 2.0 omni-reference with @mentions: fixed character refs in slots 1-2 across all generations, 3-5 core images total, don't fill all 12 slots.** Multiple 2026 guides agree; used in production by The Dor Brothers for cross-shot continuity (Deadline, Dec 2025).
9. **LoRA training (10-20 varied images, Flux/Wan) when the character appears in dozens+ of clips; references for anything smaller.** Clear 2026 consensus on the crossover point; more setup evidence than head-to-head benchmarks.
10. **Frame chaining (last clean frame of clip N seeds clip N+1) as a fallback where reference slots are missing - but chain from the approved anchor, not clip-to-clip, to avoid compounding drift.** Widely described (Kittl, invideo, magichour) but weaker than anchor-based derivation and known to degrade over long chains.

**Cross-cutting reality check:** even with all locks in place, top practitioners budget heavy selection - PJ Ace's 300-400 generations for 15 usable clips and the Dor Brothers' "hundreds of versions" are the documented hit rates behind polished 2025-2026 AI films.

**Sources:**
- [Runway - AI Character References: Tips & Techniques](https://runway.com/resources/ai-character-references-tips) (2025-12-19)
- [Runway - Creating with Gen-4 Image References](https://help.runwayml.com/hc/en-us/articles/40042718905875-Creating-with-Gen-4-Image-References)
- [Google Cloud - Ultimate prompting guide for Veo 3.1](https://cloud.google.com/blog/products/ai-machine-learning/ultimate-prompting-guide-for-veo-3-1) (2025-10-16)
- [Google - Veo 3.1 Ingredients to Video](https://blog.google/innovation-and-ai/technology/ai/veo-3-1-ingredients-to-video/)
- [Kling AI - Video Character Consistency quickstart](https://app.klingai.com/global/quickstart/ai-video-character-consistency)
- [Magic Hour - Kling 3.0 Reference Guide](https://magichour.ai/blog/kling-30-reference-guide) (2026)
- [Seedance 2 Omni Reference: the 12-File Workflow](https://seedance2pro.io/blog/seedance-2-omni-reference) (2026)
- [WaveSpeedAI - Character Consistency in Seedance 2.0](https://medium.com/@social_18794/how-to-keep-character-consistency-in-seedance-2-0-reference-pack-rules-5bb8fdc0add7)
- [Flowith - Midjourney V7 Consistent Characters (--oref/--ow)](https://flowith.io/blog/midjourney-v7-consistent-characters-masterclass/)
- [Flick - AI Character Consistency: 5 Methods Compared](https://flick.art/blog/img2img-consistent-character) (2026)
- [pIXELsHAM - Character sheet for AI videos with Nano Banana](https://www.pixelsham.com/2026/04/18/creating-a-character-sheet-for-ai-videos-using-nano-banana/) (2026-04-18)
- [Curious Refuge - Ultimate Guide to Consistent AI Characters](https://curiousrefuge.com/blog/how-to-create-consistent-ai-characters)
- [Higgsfield - How do I create and use a Soul ID character](https://higgsfield.ai/creator-hub/help-center/ai-models/how-do-i-create-and-use-a-soul-id-character)
- [Higgsfield - Soul ID AI Character Consistency](https://higgsfield.ai/blog/Soul-ID-AI-Character-Consistency)
- [TheFluxTrain - Flux LoRA Training Guide](https://thefluxtrain.com/blog/noobs-guide-to-flux-lora-training/)
- [Wan 2.2 LoRA Training Guide (I2V)](https://wan27.org/blog/wan-2-2-lora-training-guide) (2026)
- [invideo - Anchor Frame Method](https://invideo.io/blog/anchor-frame-method-ai-video/) (updated 2026-07-15)
- [invideo - AI Character Consistency](https://invideo.io/blog/ai-character-consistency-video/)
- [Magic Hour - How to Keep Characters Consistent in AI Video](https://magichour.ai/blog/how-to-keep-characters-consistent-in-ai-video) (2026)
- [MarkTechPost - Kalshi Veo 3 NBA Finals ad](https://www.marktechpost.com/2025/06/14/ai-generated-ad-created-with-googles-veo3-airs-during-nba-finals-slashing-production-costs-by-95/) (2025-06-14)
- [The Daring Creatives - PJ Ace published the prompts](https://www.thedaringcreatives.com/creator-stories/pj-ace-made-an-nba-finals-ad-for-2-000-and-published-the-prompts/)
- [Deadline - The Dor Brothers interview](https://deadline.com/2025/12/the-dor-brothers-interview-hollywood-joe-rogan-snoop-dogg-1236634355/) (2025-12)
- [GIGAZINE - Dor Brothers studio profile](https://gigazine.net/gsc_news/en/20250731-dor-video-studio-ai/) (2025-07-31)
- [The Daring Creatives - Neural Viz showrunner breakdown](https://www.thedaringcreatives.com/creator-stories/the-showrunner-how-neural-viz-makes-an-entire-tv-universe-with-ai/)
- [CinemaDrop - Consistent AI Characters guide for filmmakers](https://www.cinemadrop.com/blog/how-to-create-consistent-ai-characters-the-complete-guide-for-ai-filmmakers-in-2026) (2026)
- [Kittl - AI video character consistency workflow 2026](https://www.kittl.com/blogs/ai-video-character-consistency-workflow/)
- [astorie - Build a Consistent AI Character](https://astorie.ai/blog/how-to-build-consistent-ai-character) (2026)
- [Magic Hour - Best AI Image Generators for Character Consistency](https://magichour.ai/blog/best-ai-image-generators-for-character-consistency) (2026)
