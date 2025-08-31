import type { Meta, StoryObj } from '@storybook/react';
import { LabeledLinks } from '../components/resume/LabeledLinks';
import { Badge } from '../components/ui/badge';

const meta: Meta<typeof LabeledLinks> = {
  title: 'Resume/LabeledLinks',
  component: LabeledLinks,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    children: {
      control: false,
      description: 'LabeledLink components with labels and links',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: (
      <>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Email</LabeledLinks.Label>
          <LabeledLinks.Link text="john@example.com" href="mailto:john@example.com" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Phone</LabeledLinks.Label>
          <LabeledLinks.Link text="(555) 123-4567" href="tel:+15551234567" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Website</LabeledLinks.Label>
          <LabeledLinks.Link text="johndoe.dev" href="https://johndoe.dev" />
        </LabeledLinks.LabeledLink>
      </>
    ),
  },
};

export const WithBadgeLabels: Story = {
  args: {
    children: (
      <>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              Email
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="contact@example.com" href="mailto:contact@example.com" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              GitHub
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="github.com/username" href="https://github.com/username" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              LinkedIn
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="linkedin.com/in/username" href="https://linkedin.com/in/username" />
        </LabeledLinks.LabeledLink>
      </>
    ),
  },
};

export const WithImageLabels: Story = {
  args: {
    children: (
      <>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 max-w-8 bg-white text-black" title="GitHub">
              <div className="w-4 h-4 bg-gray-400 rounded"></div>
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="github.com/developer" href="https://github.com/developer" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 max-w-8 bg-white text-black" title="LinkedIn">
              <div className="w-4 h-4 bg-blue-400 rounded"></div>
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="linkedin.com/in/developer" href="https://linkedin.com/in/developer" />
        </LabeledLinks.LabeledLink>
      </>
    ),
  },
};

export const ContactInfo: Story = {
  args: {
    children: (
      <>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Phone</LabeledLinks.Label>
          <LabeledLinks.Link text="(847) 370-5271" href="tel:+18473705271" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Email</LabeledLinks.Label>
          <LabeledLinks.Link text="dserio.d@gmail.com" href="mailto:dserio.d@gmail.com" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>Site</LabeledLinks.Label>
          <LabeledLinks.Link text="danielserio.github.io/danserio/" href="https://danielserio.github.io/danserio/" />
        </LabeledLinks.LabeledLink>
      </>
    ),
  },
};

export const SocialLinks: Story = {
  args: {
    children: (
      <>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              GitHub
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="github.com/DanielSerio" href="https://github.com/DanielSerio" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              LinkedIn
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="linkedin.com/in/dan-serio-22a99644" href="https://www.linkedin.com/in/dan-serio-22a99644/" />
        </LabeledLinks.LabeledLink>
        <LabeledLinks.LabeledLink>
          <LabeledLinks.Label>
            <Badge variant="outline" className="min-h-5 bg-white text-black">
              Twitter
            </Badge>
          </LabeledLinks.Label>
          <LabeledLinks.Link text="@danserio_dev" href="https://twitter.com/danserio_dev" />
        </LabeledLinks.LabeledLink>
      </>
    ),
  },
};

export const SingleLink: Story = {
  args: {
    children: (
      <LabeledLinks.LabeledLink>
        <LabeledLinks.Label>Portfolio</LabeledLinks.Label>
        <LabeledLinks.Link text="myportfolio.com" href="https://myportfolio.com" />
      </LabeledLinks.LabeledLink>
    ),
  },
};