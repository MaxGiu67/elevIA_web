#!/bin/bash
#
# BMAD to Ralph Converter
# Converte gli artifacts BMAD in formato Ralph Loop
#
# Uso: ./bmad-to-ralph.sh [project-dir]
#

set -e

PROJECT_DIR="${1:-.}"
cd "$PROJECT_DIR"

echo "🔄 Converting BMAD artifacts to Ralph format..."
echo "📁 Project directory: $(pwd)"

# Verifica che esistano gli artifacts BMAD
if [ ! -d "planning-artifacts" ]; then
    echo "❌ Error: planning-artifacts/ directory not found"
    echo "   Run BMAD workflows first to generate artifacts"
    exit 1
fi

# Crea cartella scripts/ralph se non esiste
mkdir -p scripts/ralph

# 1. Genera prd.json dalle stories BMAD
echo "📋 Generating prd.json..."

cat > prd.json << EOF
{
  "project": "$(basename $(pwd))",
  "version": "1.0.0",
  "created": "$(date -I)",
  "methodology": "BMAD + Ralph Loop",
  "artifacts": {
    "prd": "planning-artifacts/prd.md",
    "architecture": "planning-artifacts/architecture.md",
    "stories": "planning-artifacts/epics-stories.md"
  },
  "stories": [
    {
      "id": "STORY-001",
      "epic": "Setup",
      "title": "Initial Setup",
      "description": "Parse epics-stories.md and implement first story",
      "acceptance_criteria": [
        "Read planning-artifacts/epics-stories.md",
        "Identify first actionable story",
        "Implement with TDD"
      ],
      "priority": 1,
      "status": "pending",
      "tests": []
    }
  ],
  "config": {
    "max_iterations": 100,
    "test_command": "npm test",
    "completion_word": "COMPLETE"
  }
}
EOF

# 2. Genera prompt.md per Ralph
echo "📝 Generating prompt.md..."

cat > prompt.md << 'EOF'
# Ralph Loop Instructions

## Project Context

You are an AI developer working on this project using the BMAD + Ralph Loop methodology.
Your task is to implement user stories autonomously, one at a time, following TDD principles.

## Reference Documents

Before starting any implementation, read these planning artifacts:

1. **PRD (Product Requirements)**: `planning-artifacts/prd.md`
2. **Architecture**: `planning-artifacts/architecture.md`
3. **Epics & Stories**: `planning-artifacts/epics-stories.md`
4. **UX Design** (if exists): `planning-artifacts/ux-design.md`

## Current Task

1. Read `prd.json` to find stories with `"status": "pending"`
2. Select the story with the lowest priority number (highest priority)
3. Implement that story following TDD

## Implementation Workflow

### Step 1: Understand the Story
- Read the story's acceptance criteria
- Identify what tests need to be written
- Check the architecture for relevant patterns

### Step 2: Write Tests First (TDD)
- Create failing tests for each acceptance criterion
- Tests should be specific and atomic
- Run tests to confirm they fail

### Step 3: Implement
- Write minimum code to pass tests
- Follow existing code patterns and architecture
- Handle errors appropriately

### Step 4: Refactor
- Clean up code if needed
- Ensure no linting errors
- Add necessary documentation

### Step 5: Verify
- Run full test suite
- All tests must pass
- Check for any regressions

### Step 6: Complete
- Update `prd.json`: set story status to "completed"
- Add completion timestamp
- Say "COMPLETE" to trigger validation hook

## Code Standards

- Follow existing project patterns
- Use TypeScript/JavaScript best practices
- No `console.log` in production code (use proper logging)
- Handle all error cases
- Add JSDoc comments for public functions
- Keep functions small and focused

## Git Workflow

After each completed story:
- Stage all changes: `git add -A`
- Commit with message: `feat(scope): story title`
- Include story ID in commit body

## Rules

1. **ONE story per iteration** - Do not try to do multiple stories
2. **Tests MUST pass** - Never mark a story complete with failing tests
3. **Follow architecture** - Respect the design in architecture.md
4. **Atomic commits** - Each story = one commit
5. **Update progress** - Always update prd.json status

## When Stuck

If you cannot complete a story after 3 attempts:
1. Document the blocker in `progress.txt`
2. Add a note to the story in `prd.json`
3. Move to next story if possible
4. Say "BLOCKED" instead of "COMPLETE"

## Completion Signal

When current story is fully complete:
1. All acceptance criteria met ✓
2. All tests passing ✓
3. Code committed ✓
4. prd.json updated ✓

Then say: **COMPLETE**

This will trigger the validation hook to verify your work.
EOF

# 3. Genera progress.txt
echo "📊 Generating progress.txt..."

cat > progress.txt << EOF
# Ralph Loop Progress Log
# ========================
# Project: $(basename $(pwd))
# Started: $(date)
# Methodology: BMAD + Ralph Loop
#
# This file tracks the progress of Ralph Loop iterations.
# Each iteration will append its status here.
#
# Legend:
# ✅ COMPLETED - Story fully implemented and tested
# 🔄 IN_PROGRESS - Currently working on story
# ❌ FAILED - Tests not passing
# ⚠️ BLOCKED - Cannot proceed, needs human intervention
#
================================================================================

EOF

# 4. Genera ralph.sh script
echo "⚙️ Generating scripts/ralph/ralph.sh..."

cat > scripts/ralph/ralph.sh << 'RALPHSCRIPT'
#!/bin/bash
#
# Ralph Loop - Autonomous Development Loop
# Usage: ./scripts/ralph/ralph.sh [max_iterations]
#

set -e

MAX_ITERATIONS=${1:-50}
ITERATION=0
COMPLETED=0
FAILED=0

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║           RALPH LOOP - Autonomous Development             ║${NC}"
echo -e "${BLUE}║                  BMAD + Ralph Integration                  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Max iterations: ${YELLOW}$MAX_ITERATIONS${NC}"
echo -e "Started at: $(date)"
echo ""

# Check prerequisites
if [ ! -f "prd.json" ]; then
    echo -e "${RED}Error: prd.json not found. Run bmad-to-ralph.sh first.${NC}"
    exit 1
fi

if [ ! -f "prompt.md" ]; then
    echo -e "${RED}Error: prompt.md not found. Run bmad-to-ralph.sh first.${NC}"
    exit 1
fi

# Main loop
while [ $ITERATION -lt $MAX_ITERATIONS ]; do
    ITERATION=$((ITERATION + 1))

    echo ""
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo -e "${BLUE}  ITERATION $ITERATION of $MAX_ITERATIONS${NC}"
    echo -e "${BLUE}════════════════════════════════════════════════════════════${NC}"
    echo ""

    # Log iteration start
    echo "================================================================================" >> progress.txt
    echo "ITERATION $ITERATION - $(date)" >> progress.txt
    echo "================================================================================" >> progress.txt

    # Check remaining stories
    PENDING=$(cat prd.json | jq '[.stories[] | select(.status == "pending")] | length')
    echo -e "Pending stories: ${YELLOW}$PENDING${NC}"

    if [ "$PENDING" -eq 0 ]; then
        echo -e "${GREEN}🎉 All stories completed!${NC}"
        echo "ALL STORIES COMPLETED at $(date)" >> progress.txt
        break
    fi

    # Get current story
    CURRENT_STORY=$(cat prd.json | jq -r '.stories[] | select(.status == "pending") | .title' | head -1)
    echo -e "Current story: ${YELLOW}$CURRENT_STORY${NC}"
    echo "Story: $CURRENT_STORY" >> progress.txt

    # Run Claude with prompt
    echo -e "${BLUE}Running Claude...${NC}"

    # Execute Claude Code with the prompt
    # Note: Adjust this command based on your Claude Code setup
    if command -v claude &> /dev/null; then
        claude --print "$(cat prompt.md)" 2>&1 | tee -a progress.txt
    else
        echo -e "${RED}Claude CLI not found. Using fallback...${NC}"
        # Fallback: just run tests
    fi

    # Run tests
    echo -e "${BLUE}Running tests...${NC}"

    # Detect test command
    if [ -f "package.json" ]; then
        TEST_CMD="npm test"
    elif [ -f "requirements.txt" ] || [ -f "pyproject.toml" ]; then
        TEST_CMD="pytest"
    elif [ -f "go.mod" ]; then
        TEST_CMD="go test ./..."
    else
        TEST_CMD="echo 'No test framework detected'"
    fi

    if $TEST_CMD; then
        echo -e "${GREEN}✅ Tests passed!${NC}"
        echo "Status: PASSED ✅" >> progress.txt
        COMPLETED=$((COMPLETED + 1))

        # Commit changes
        if git diff --quiet && git diff --staged --quiet; then
            echo -e "${YELLOW}No changes to commit${NC}"
        else
            git add -A
            git commit -m "feat: Ralph iteration $ITERATION - $CURRENT_STORY

Automated commit by Ralph Loop
Story: $CURRENT_STORY
Iteration: $ITERATION"
            echo -e "${GREEN}Changes committed${NC}"
            echo "Commit: $(git rev-parse --short HEAD)" >> progress.txt
        fi
    else
        echo -e "${RED}❌ Tests failed${NC}"
        echo "Status: FAILED ❌" >> progress.txt
        FAILED=$((FAILED + 1))
    fi

    echo "" >> progress.txt

    # Brief pause to prevent API rate limiting
    sleep 2
done

# Summary
echo ""
echo -e "${BLUE}╔════════════════════════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║                    RALPH LOOP COMPLETE                     ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════════════════════════╝${NC}"
echo ""
echo -e "Total iterations: ${YELLOW}$ITERATION${NC}"
echo -e "Successful: ${GREEN}$COMPLETED${NC}"
echo -e "Failed: ${RED}$FAILED${NC}"
echo -e "Ended at: $(date)"
echo ""

# Final summary in progress.txt
echo "" >> progress.txt
echo "================================================================================" >> progress.txt
echo "RALPH LOOP SUMMARY" >> progress.txt
echo "================================================================================" >> progress.txt
echo "Total iterations: $ITERATION" >> progress.txt
echo "Successful: $COMPLETED" >> progress.txt
echo "Failed: $FAILED" >> progress.txt
echo "Ended: $(date)" >> progress.txt
RALPHSCRIPT

chmod +x scripts/ralph/ralph.sh

# 5. Crea .gitignore entries se necessario
if [ -f ".gitignore" ]; then
    if ! grep -q "progress.txt" .gitignore; then
        echo "" >> .gitignore
        echo "# Ralph Loop" >> .gitignore
        echo "# progress.txt  # Uncomment if you don't want to track progress" >> .gitignore
    fi
fi

echo ""
echo "✅ Conversion complete!"
echo ""
echo "📁 Files created:"
echo "   - prd.json (task definitions)"
echo "   - prompt.md (Claude instructions)"
echo "   - progress.txt (iteration log)"
echo "   - scripts/ralph/ralph.sh (loop script)"
echo ""
echo "📋 Next steps:"
echo "   1. Edit prd.json to add your actual stories from BMAD"
echo "   2. Review prompt.md and customize if needed"
echo "   3. Run: ./scripts/ralph/ralph.sh 50"
echo ""
echo "💡 Tip: Use 'tail -f progress.txt' to monitor in real-time"
