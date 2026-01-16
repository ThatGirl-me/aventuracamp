(() => {
  const repoOwner = "unkarelian";
  const repoName = "Aventura";
  const apiUrl = `https://api.github.com/repos/${repoOwner}/${repoName}/releases/latest`;
  const pkgFallbackUrl = `https://raw.githubusercontent.com/${repoOwner}/${repoName}/main/package.json`;

  const filenameTemplates = {
    windows: v => `Aventura_${v}_x64-setup.exe`,
    mac: v => `Aventura_${v}_x64.dmg`,
    linux: v => `Aventura_${v}_amd64.AppImage`,
    android: () => "aventura-release.apk"
  };

  const patterns = {
    windows: [".exe"],
    mac: [".dmg"],
    linux: ["appimage"],
    android: [".apk"]
  };

  const setLoadingState = () => {
    document.querySelectorAll("[data-release-version]").forEach(el => {
      const prefix = el.getAttribute("data-release-prefix");
      el.textContent = prefix ? `${prefix} - checking latest...` : "Checking latest...";
    });
  };

  const normalizeTag = tag => (tag || "").trim() || "";
  const versionFromTag = tag => normalizeTag(tag).replace(/^v/i, "");

  const findAssetUrl = (assets, key) => {
    if (!assets?.length) return null;
    const matchers = patterns[key] || [];
    const asset = assets.find(a => matchers.some(m => a.name.toLowerCase().includes(m)));
    return asset?.browser_download_url || null;
  };

  const buildTemplateUrl = (tag, key) => {
    const version = versionFromTag(tag);
    const template = filenameTemplates[key];
    if (!template || !version) return null;
    const filename = template(version);
    return `https://github.com/${repoOwner}/${repoName}/releases/download/${tag}/${filename}`;
  };

  const updateVersionBadges = tag => {
    const cleanTag = normalizeTag(tag);
    if (!cleanTag) return;
    document.querySelectorAll("[data-release-version]").forEach(el => {
      const prefix = el.getAttribute("data-release-prefix") || "";
      el.textContent = prefix ? `${prefix} ${cleanTag}` : cleanTag;
    });
  };

  const updateDownloadLinks = (tag, assets) => {
    if (!tag) return;
    document.querySelectorAll("[data-platform]").forEach(link => {
      const key = link.getAttribute("data-platform");
      const assetUrl = findAssetUrl(assets, key);
      const templateUrl = buildTemplateUrl(tag, key);
      const finalUrl = assetUrl || templateUrl;
      if (finalUrl) link.setAttribute("href", finalUrl);
    });
  };

  const hydrateReleaseData = async () => {
    setLoadingState();
    let tag = "";
    let assets = [];
    try {
      const res = await fetch(apiUrl, {
        cache: "no-store",
        headers: {
          Accept: "application/vnd.github+json",
          "X-GitHub-Api-Version": "2022-11-28"
        }
      });
      if (res.ok) {
        const data = await res.json();
        tag = data?.tag_name || data?.name || "";
        assets = data?.assets || [];
      }
    } catch (err) {
      console.warn("Release API unavailable, trying fallback:", err);
    }

    if (!tag) {
      try {
        const res = await fetch(pkgFallbackUrl, { cache: "no-store" });
        if (res.ok) {
          const pkg = await res.json();
          if (pkg?.version) tag = `v${pkg.version}`;
        }
      } catch (err) {
        console.warn("Fallback package fetch failed:", err);
      }
    }

    if (tag) {
      updateVersionBadges(tag);
      updateDownloadLinks(tag, assets);
    }
  };

  document.addEventListener("DOMContentLoaded", hydrateReleaseData);
})();
