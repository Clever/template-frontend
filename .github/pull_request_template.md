# Jira

[TICKET-123](https://clever.atlassian.net/browse/TICKET-123)

# Overview

# Testing

# Rollout

# New repo setup

- [ ] Populate the `HOST` and `PORT` env vars in [ark-config](https://github.com/Clever/ark-config)
- [ ] Set up Slack notifications for this app for your team if you'd like ([GitHub assignments and notifications](https://clever.atlassian.net/wiki/spaces/ENG/pages/888897571/GitHub+assignments))
- [ ] Tune your alarms if you'd like anything other than our default recommendations ([alarm best practices](https://clever.atlassian.net/wiki/spaces/~620990898/pages/904036784/Alarm+Best+Practices))
- [ ] Step through the repo's TODOs and prioritize them as you see fit. You can ignore TODOs suffixed with `(template-frontend)` as those are intended for the maintainers of the template, not you as a consumer of the template
- [ ] Adjust the cpu and max_mem values based on the needs of your application as the containers are killed if these values are exceeded
- [ ] If this app should be set up to use canaries please edit the deploy step in .circleci/config.yml to use `canary-confirm-deploy` instead of `confirm-then-deploy`
- [ ] If this app should be multi region in sso pods adjust the pod_config https://clever.atlassian.net/wiki/spaces/ENG/pages/370147335/launch.yml#launch.yml-PodConfig
- [ ] Delete this section from the PR template
