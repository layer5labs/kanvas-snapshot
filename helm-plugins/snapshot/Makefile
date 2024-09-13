# Load environment variables from env.mk
include $(HELM_PLUGIN_DIR)/Makefile.core.mk


# Build the binary and inject environment variables at build time
.PHONY: build
build:
	@echo "Building Helm Plugin with injected environment variables"
	@GITHUB_TOKEN=$(GITHUB_TOKEN) \
	MESHERY_TOKEN=$(MESHERY_TOKEN) \
	COOKIE=$(COOKIE) \
	OWNER=$(OWNER) \
	REPO=$(REPO) \
	WORKFLOW=$(WORKFLOW) \
	BRANCH=$(BRANCH) \
	MESHERY_CLOUD_BASE_URL=$(MESHERY_CLOUD_BASE_URL) \
	cd $(HELM_PLUGIN_DIR) && go build -o helm-plugin-snapshot


# Task to clean up build artifacts
.PHONY: clean
clean:
	@echo "Cleaning build artifacts..."
	@rm -f helm-plugin-snapshot
